import request from 'supertest';
import Stripe from 'stripe';
import app from '../../app';
import UserModel from '../../models/userModel';
import DonationHistoryModel from '../../models/donationHistoryModel';
import { hashPassword } from '../../helpers/auth';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test';

function signedWebhookBody(payload: object) {
  const stripe = new Stripe('sk_test_dummy');
  const payloadString = JSON.stringify(payload);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: webhookSecret,
  });
  return { payloadString, header };
}

describe('INT-PAY: stripe webhook', () => {
  afterEach(() => jest.restoreAllMocks());
  it('rejects webhook with missing signature', async () => {
    const res = await request(app)
      .post('/api/payment/webhook')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ type: 'ping' }));
    expect(res.status).toBe(400);
  });

  it('rejects webhook with bad signature', async () => {
    const res = await request(app)
      .post('/api/payment/webhook')
      .set('Content-Type', 'application/json')
      .set('stripe-signature', 't=1,v1=deadbeef')
      .send(JSON.stringify({ type: 'ping' }));
    expect(res.status).toBe(400);
  });

  it('accepts signed payment_intent.succeeded and saves donation', async () => {
    const user = await UserModel.create({
      name: 'Webhook Donor',
      email: 'webhook@example.com',
      password: await hashPassword('abcdef'),
    });

    const event = {
      id: 'evt_test_1',
      object: 'event',
      type: 'payment_intent.succeeded',
      data: {
        object: {
          id: 'pi_int_test_1',
          object: 'payment_intent',
          amount_received: 2500,
          currency: 'usd',
          metadata: { userId: user._id.toString() },
        },
      },
    };

    const { payloadString, header } = signedWebhookBody(event);
    const res = await request(app)
      .post('/api/payment/webhook')
      .set('Content-Type', 'application/json')
      .set('stripe-signature', header)
      .send(payloadString);

    expect(res.status).toBe(200);
    const saved = await DonationHistoryModel.findOne({ stripePaymentId: 'pi_int_test_1' });
    expect(saved).not.toBeNull();
    expect(saved!.amount).toBe(25);
  });

  it('keeps a single row when the same payment_intent is delivered twice', async () => {
    const user = await UserModel.create({
      name: 'Dup Donor',
      email: 'webhook-dup@example.com',
      password: await hashPassword('abcdef'),
    });

    const event = {
      id: 'evt_test_dup',
      object: 'event',
      type: 'payment_intent.succeeded',
      data: {
        object: {
          id: 'pi_int_dup',
          object: 'payment_intent',
          amount_received: 1000,
          currency: 'usd',
          metadata: { userId: user._id.toString() },
        },
      },
    };

    const first = signedWebhookBody(event);
    const firstResponse = await request(app)
      .post('/api/payment/webhook')
      .set('Content-Type', 'application/json')
      .set('stripe-signature', first.header)
      .send(first.payloadString);
    expect(firstResponse.status).toBe(200);

    const second = signedWebhookBody(event);
    const secondResponse = await request(app)
      .post('/api/payment/webhook')
      .set('Content-Type', 'application/json')
      .set('stripe-signature', second.header)
      .send(second.payloadString);
    expect(secondResponse.status).toBe(200);

    const count = await DonationHistoryModel.countDocuments({ stripePaymentId: 'pi_int_dup' });
    expect(count).toBe(1);
  });

  it('BUG-07: returns 500 on save failure and persists a retried delivery once', async () => {
    const event = {
      id: 'evt_retry', object: 'event', type: 'payment_intent.succeeded',
      data: { object: {
        id: 'pi_retry', amount_received: 1000, currency: 'usd',
        metadata: { userId: '507f1f77bcf86cd799439011' },
      } },
    };
    const { payloadString, header } = signedWebhookBody(event);
    const deliver = () => request(app).post('/api/payment/webhook')
      .set('Content-Type', 'application/json').set('stripe-signature', header).send(payloadString);
    jest.spyOn(DonationHistoryModel.prototype, 'save').mockRejectedValueOnce(new Error('DB unavailable'));
    const failed = await deliver();
    expect(failed.status).toBe(500);
    expect(failed.body.error).toEqual(expect.any(String));
    expect(await DonationHistoryModel.countDocuments({ stripePaymentId: 'pi_retry' })).toBe(0);
    expect((await deliver()).status).toBe(200);
    expect((await deliver()).status).toBe(200);
    expect(await DonationHistoryModel.countDocuments({ stripePaymentId: 'pi_retry' })).toBe(1);
  });

  it.each([
    { code: 11000, keyPattern: { otherField: 1 }, keyValue: { otherField: 'duplicate' } },
    { code: 11000, keyPattern: { stripePaymentId: 1 }, keyValue: { stripePaymentId: 'pi_other' } },
  ])('BUG-07: does not acknowledge an unrelated duplicate error %p', async (dbError) => {
    const { payloadString, header } = signedWebhookBody({
      id: 'evt_unrelated', object: 'event', type: 'payment_intent.succeeded',
      data: { object: {
        id: 'pi_unrelated', amount_received: 1000, currency: 'usd',
        metadata: { userId: '507f1f77bcf86cd799439011' },
      } },
    });
    jest.spyOn(DonationHistoryModel.prototype, 'save').mockRejectedValueOnce(dbError);
    const response = await request(app).post('/api/payment/webhook')
      .set('Content-Type', 'application/json').set('stripe-signature', header).send(payloadString);
    expect(response.status).toBe(500);
    expect(await DonationHistoryModel.countDocuments({ stripePaymentId: 'pi_unrelated' })).toBe(0);
  });

  it('acknowledges concurrent duplicate deliveries while saving one donation', async () => {
    await DonationHistoryModel.init();
    const { payloadString, header } = signedWebhookBody({
      id: 'evt_concurrent', object: 'event', type: 'payment_intent.succeeded',
      data: { object: {
        id: 'pi_concurrent', amount_received: 1000, currency: 'usd',
        metadata: { userId: '507f1f77bcf86cd799439011' },
      } },
    });
    const deliver = () => request(app).post('/api/payment/webhook')
      .set('Content-Type', 'application/json').set('stripe-signature', header).send(payloadString);
    const responses = await Promise.all([deliver(), deliver()]);
    expect(responses.map((response) => response.status)).toEqual([200, 200]);
    expect(await DonationHistoryModel.countDocuments({ stripePaymentId: 'pi_concurrent' })).toBe(1);
  });
});
