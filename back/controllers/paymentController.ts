import { RequestHandler } from 'express';
import Stripe from 'stripe';
import DonationHistoryModel from '../models/donationHistoryModel';

const MAX_DONATION_AMOUNT = 10_000;

const getStripe = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY?.trim();
  return apiKey ? new Stripe(apiKey) : null;
};

export const createPaymentIntent: RequestHandler = async (req, res) => {
  console.log('--- 1. /create-payment-intent endpoint hit ---');
  
  const { amount } = req.body;
  const user = req.user;

  if (!user) {
    console.error('--- ERROR: No user found on request. Middleware might have failed. ---');
    res.status(401).json({ error: 'User not found. Please log in.' });
    return;
  }

  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0 || amount > MAX_DONATION_AMOUNT) {
    console.error('Invalid donation amount.');
    res.status(400).json({ error: 'Amount must be a positive number no greater than 10000 USD.' });
    return;
  }

  const amountInCents = Math.round(amount * 100);
  // Round-trip through cents to reject excess precision without rejecting 0.29, for example.
  if (amountInCents / 100 !== amount) {
    res.status(400).json({ error: 'Amount must have at most two decimal places.' });
    return;
  }

  const stripe = getStripe();
  if (!stripe) {
    res.status(503).json({ error: 'Stripe payments are not configured.' });
    return;
  }
  
  console.log(`--- 2. Preparing to create payment for amount: ${amount}, user: ${user.email} ---`);

  try {
    console.log('--- 3. Contacting Stripe to create Payment Intent... ---');
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        userId: user._id.toString(),
      }
    });
    
    console.log('--- 4. Stripe responded successfully. Sending clientSecret to frontend. ---');
    res.send({ clientSecret: paymentIntent.client_secret });

  } catch (error: any) {
    console.error('--- 5. ERROR occurred while contacting Stripe ---', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const handleStripeWebhook: RequestHandler = async (req, res) => {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!stripe || !webhookSecret) {
    res.status(503).json({ error: 'Stripe payments are not configured.' });
    return;
  }

  const sig = req.headers['stripe-signature'] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;

      const userId = paymentIntent.metadata.userId;
      const amount = paymentIntent.amount_received / 100;
      const currency = paymentIntent.currency;
      const stripePaymentId = paymentIntent.id;

      try {
        const newDonation = new DonationHistoryModel({
          user: userId,
          amount,
          currency,
          stripePaymentId,
          status: 'succeeded'
        });
        await newDonation.save();
        console.log(`Donation from user ${userId} for ${amount} ${currency} saved.`);
      } catch (dbError) {
        const duplicateError = dbError as {
          code?: number;
          keyPattern?: { stripePaymentId?: number };
          keyValue?: { stripePaymentId?: string };
        };
        if (duplicateError?.code === 11000 &&
            duplicateError.keyPattern?.stripePaymentId === 1 &&
            duplicateError.keyValue?.stripePaymentId === stripePaymentId) {
          res.status(200).send();
          return;
        }
        console.error('Error saving donation to database:', dbError);
        res.status(500).json({ error: 'Failed to save donation. Please retry the webhook.' });
        return;
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send();
}
