import { test, expect } from '../fixtures/pages';
import {
  buildPaymentIntentSucceededEvent,
  hasRealStripeKey,
  postSignedWebhook,
  signWebhookPayload,
} from '../fixtures/stripe';

test.describe('API-PAY', () => {
  test('missing auth returns 401', async ({ asAnon }) => {
    const res = await asAnon.post('/api/payment/create-payment-intent', {
      data: { amount: 25 },
    });
    expect(res.status()).toBe(401);
  });

  test('rejects amount 0 and negative', async ({ freshUser }) => {
    const zero = await freshUser.context.post('/api/payment/create-payment-intent', {
      data: { amount: 0 },
    });
    expect(zero.status()).toBe(400);

    const neg = await freshUser.context.post('/api/payment/create-payment-intent', {
      data: { amount: -5 },
    });
    expect(neg.status()).toBe(400);
  });

  for (const amount of ['abc', 0.001, 10.555, 1e10] as const) {
    test.fail(
      `BUG-06: amount ${amount} should be rejected with 400`,
      async ({ freshUser }) => {
        const res = await freshUser.context.post('/api/payment/create-payment-intent', {
          data: { amount },
        });
        expect(res.status()).toBe(400);
      }
    );
  }

  test('valid amount returns Stripe clientSecret', async ({ freshUser }) => {
    test.skip(!hasRealStripeKey(), 'Requires real STRIPE_SECRET_KEY');
    const res = await freshUser.context.post('/api/payment/create-payment-intent', {
      data: { amount: 25 },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.clientSecret).toMatch(/^pi_.+_secret_/);
  });

  test('webhook rejects missing and bad signatures', async ({ asAnon }) => {
    const missing = await asAnon.post('/api/payment/webhook', {
      data: JSON.stringify({ type: 'ping' }),
      headers: { 'content-type': 'application/json' },
    });
    expect(missing.status()).toBe(400);

    const bad = await asAnon.post('/api/payment/webhook', {
      data: JSON.stringify({ type: 'ping' }),
      headers: {
        'content-type': 'application/json',
        'stripe-signature': 't=1,v1=deadbeef',
      },
    });
    expect(bad.status()).toBe(400);
  });

  test('signed payment_intent.succeeded saves donation and is idempotent', async ({
    freshUser,
    asAnon,
  }) => {
    const profile = await freshUser.context.get('/profile');
    const user = await profile.json();
    const piId = `pi_api_${Date.now()}`;
    const event = buildPaymentIntentSucceededEvent({
      paymentIntentId: piId,
      userId: user._id,
      amountCents: 2500,
    });

    const first = await postSignedWebhook(asAnon, event);
    expect(first.status()).toBe(200);

    const second = await postSignedWebhook(asAnon, event);
    expect(second.status()).toBe(200);

    const history = await freshUser.context.get('/api/users/donations');
    expect(history.status()).toBe(200);
    const donations = await history.json();
    const matches = donations.filter((d: { stripePaymentId: string }) => d.stripePaymentId === piId);
    expect(matches).toHaveLength(1);
    expect(matches[0].amount).toBe(25);
  });

  test.fail('BUG-07: invalid userId on webhook should return 5xx', async ({ asAnon }) => {
    const event = buildPaymentIntentSucceededEvent({
      paymentIntentId: `pi_bad_${Date.now()}`,
      userId: 'not-a-valid-objectid',
      amountCents: 500,
    });
    const { body, signature } = signWebhookPayload(event);
    const res = await asAnon.post('/api/payment/webhook', {
      data: body,
      headers: {
        'content-type': 'application/json',
        'stripe-signature': signature,
      },
    });
    expect(res.status()).toBeGreaterThanOrEqual(500);
  });
});
