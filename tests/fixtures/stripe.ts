import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test';
const API_URL = process.env.API_URL || 'http://localhost:3000';

export function hasRealStripeKey(): boolean {
  const key = process.env.STRIPE_SECRET_KEY || '';
  return key.startsWith('sk_test_') && !key.includes('dummy') && !key.includes('replace');
}

export function buildPaymentIntentSucceededEvent(opts: {
  paymentIntentId: string;
  userId: string;
  amountCents: number;
  currency?: string;
}) {
  return {
    id: `evt_${opts.paymentIntentId}`,
    object: 'event',
    type: 'payment_intent.succeeded',
    data: {
      object: {
        id: opts.paymentIntentId,
        object: 'payment_intent',
        amount_received: opts.amountCents,
        currency: opts.currency || 'usd',
        metadata: { userId: opts.userId },
      },
    },
  };
}

export function signWebhookPayload(payload: object): { body: string; signature: string } {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');
  const body = JSON.stringify(payload);
  const signature = stripe.webhooks.generateTestHeaderString({
    payload: body,
    secret: webhookSecret,
  });
  return { body, signature };
}

export async function postSignedWebhook(
  request: { post: Function },
  payload: object
) {
  const { body, signature } = signWebhookPayload(payload);
  return request.post(`${API_URL}/api/payment/webhook`, {
    data: body,
    headers: {
      'content-type': 'application/json',
      'stripe-signature': signature,
    },
  });
}
