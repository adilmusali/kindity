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
    await request(app)
      .post('/api/payment/webhook')
      .set('Content-Type', 'application/json')
      .set('stripe-signature', first.header)
      .send(first.payloadString);

    const second = signedWebhookBody(event);
    await request(app)
      .post('/api/payment/webhook')
      .set('Content-Type', 'application/json')
      .set('stripe-signature', second.header)
      .send(second.payloadString);

    const count = await DonationHistoryModel.countDocuments({ stripePaymentId: 'pi_int_dup' });
    expect(count).toBe(1);
  });
});
