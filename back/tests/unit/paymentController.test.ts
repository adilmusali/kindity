import { Request, Response } from 'express';
import DonationHistoryModel from '../../models/donationHistoryModel';
import UserModel from '../../models/userModel';
import { hashPassword } from '../../helpers/auth';

const mockCreate = jest.fn();
const mockConstructEvent = jest.fn();

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    paymentIntents: { create: mockCreate },
    webhooks: { constructEvent: mockConstructEvent },
  }));
});

// Import after mock so Stripe uses the stub
import {
  createPaymentIntent,
  handleStripeWebhook,
} from '../../controllers/paymentController';

const mockRes = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('UNIT-PAY: createPaymentIntent', () => {
  beforeEach(() => {
    mockCreate.mockReset();
    mockConstructEvent.mockReset();
  });

  it('returns 401 when no user on request', async () => {
    const req = { body: { amount: 25 }, user: undefined } as unknown as Request;
    const res = mockRes();
    await createPaymentIntent(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('returns 400 for amount 0', async () => {
    const user = await UserModel.create({
      name: 'P',
      email: 'p0@example.com',
      password: await hashPassword('abcdef'),
    });
    const req = { body: { amount: 0 }, user } as unknown as Request;
    const res = mockRes();
    await createPaymentIntent(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 for negative amount', async () => {
    const user = await UserModel.create({
      name: 'P',
      email: 'pneg@example.com',
      password: await hashPassword('abcdef'),
    });
    const req = { body: { amount: -5 }, user } as unknown as Request;
    const res = mockRes();
    await createPaymentIntent(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('creates payment intent with integer cents for valid amount', async () => {
    const user = await UserModel.create({
      name: 'P',
      email: 'pok@example.com',
      password: await hashPassword('abcdef'),
    });
    mockCreate.mockResolvedValue({ client_secret: 'pi_test_secret_abc' });
    const req = { body: { amount: 25 }, user } as unknown as Request;
    const res = mockRes();
    await createPaymentIntent(req, res, jest.fn());
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 2500, currency: 'usd' })
    );
    expect(res.send).toHaveBeenCalledWith({ clientSecret: 'pi_test_secret_abc' });
  });

  // BUG-06: amount validation gaps
  it.failing(
    'BUG-06: rejects non-numeric amount string (https://github.com/adilmusali/kindity/issues?q=BUG-06)',
    async () => {
      const user = await UserModel.create({
        name: 'P',
        email: 'pstr@example.com',
        password: await hashPassword('abcdef'),
      });
      const req = { body: { amount: 'abc' }, user } as unknown as Request;
      const res = mockRes();
      await createPaymentIntent(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockCreate).not.toHaveBeenCalled();
    }
  );

  it.failing(
    'BUG-06: rejects 0.001 (sub-cent) (https://github.com/adilmusali/kindity/issues?q=BUG-06)',
    async () => {
      const user = await UserModel.create({
        name: 'P',
        email: 'p001@example.com',
        password: await hashPassword('abcdef'),
      });
      const req = { body: { amount: 0.001 }, user } as unknown as Request;
      const res = mockRes();
      await createPaymentIntent(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockCreate).not.toHaveBeenCalled();
    }
  );

  it.failing(
    'BUG-06: rejects 10.555 (non-integer cents) (https://github.com/adilmusali/kindity/issues?q=BUG-06)',
    async () => {
      const user = await UserModel.create({
        name: 'P',
        email: 'p555@example.com',
        password: await hashPassword('abcdef'),
      });
      const req = { body: { amount: 10.555 }, user } as unknown as Request;
      const res = mockRes();
      await createPaymentIntent(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockCreate).not.toHaveBeenCalled();
    }
  );

  it.failing(
    'BUG-06: rejects absurdly large amount 1e10 (https://github.com/adilmusali/kindity/issues?q=BUG-06)',
    async () => {
      const user = await UserModel.create({
        name: 'P',
        email: 'phuge@example.com',
        password: await hashPassword('abcdef'),
      });
      const req = { body: { amount: 1e10 }, user } as unknown as Request;
      const res = mockRes();
      await createPaymentIntent(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockCreate).not.toHaveBeenCalled();
    }
  );
});

describe('UNIT-PAY: handleStripeWebhook', () => {
  beforeEach(() => {
    mockCreate.mockReset();
    mockConstructEvent.mockReset();
  });

  it('returns 400 for bad signature', async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error('Invalid signature');
    });
    const req = {
      body: Buffer.from('{}'),
      headers: { 'stripe-signature': 'bad' },
    } as unknown as Request;
    const res = mockRes();
    await handleStripeWebhook(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('saves donation on payment_intent.succeeded', async () => {
    const user = await UserModel.create({
      name: 'Donor',
      email: 'donor@example.com',
      password: await hashPassword('abcdef'),
    });
    mockConstructEvent.mockReturnValue({
      type: 'payment_intent.succeeded',
      data: {
        object: {
          id: 'pi_test_unique_1',
          amount_received: 2500,
          currency: 'usd',
          metadata: { userId: user._id.toString() },
        },
      },
    });
    const req = {
      body: Buffer.from('{}'),
      headers: { 'stripe-signature': 'sig' },
    } as unknown as Request;
    const res = mockRes();
    await handleStripeWebhook(req, res, jest.fn());
    expect(res.send).toHaveBeenCalled();
    const saved = await DonationHistoryModel.findOne({ stripePaymentId: 'pi_test_unique_1' });
    expect(saved).not.toBeNull();
    expect(saved!.amount).toBe(25);
  });

  it('is idempotent for duplicate payment_intent.succeeded (unique stripePaymentId)', async () => {
    const user = await UserModel.create({
      name: 'Donor2',
      email: 'donor2@example.com',
      password: await hashPassword('abcdef'),
    });
    const event = {
      type: 'payment_intent.succeeded',
      data: {
        object: {
          id: 'pi_test_dup',
          amount_received: 1000,
          currency: 'usd',
          metadata: { userId: user._id.toString() },
        },
      },
    };
    mockConstructEvent.mockReturnValue(event);
    const req = {
      body: Buffer.from('{}'),
      headers: { 'stripe-signature': 'sig' },
    } as unknown as Request;
    const res1 = mockRes();
    await handleStripeWebhook(req, res1, jest.fn());
    const res2 = mockRes();
    await handleStripeWebhook(req, res2, jest.fn());
    const count = await DonationHistoryModel.countDocuments({ stripePaymentId: 'pi_test_dup' });
    expect(count).toBe(1);
  });

  // BUG-07: DB save errors swallowed, still returns 200
  it.failing(
    'BUG-07: returns 5xx when donation save fails (https://github.com/adilmusali/kindity/issues?q=BUG-07)',
    async () => {
      const user = await UserModel.create({
        name: 'FailSave',
        email: 'failsave@example.com',
        password: await hashPassword('abcdef'),
      });
      mockConstructEvent.mockReturnValue({
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_save_fail',
            amount_received: 500,
            currency: 'usd',
            metadata: { userId: user._id.toString() },
          },
        },
      });
      jest
        .spyOn(DonationHistoryModel.prototype, 'save')
        .mockRejectedValueOnce(new Error('simulated DB failure'));
      const req = {
        body: Buffer.from('{}'),
        headers: { 'stripe-signature': 'sig' },
      } as unknown as Request;
      const res = mockRes();
      await handleStripeWebhook(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(expect.any(Number));
      const statusArg = (res.status as jest.Mock).mock.calls[0][0];
      expect(statusArg).toBeGreaterThanOrEqual(500);
    }
  );
});
