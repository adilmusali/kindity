import { RequestHandler } from 'express';
import Stripe from 'stripe';
import DonationHistoryModel from '../models/donationHistoryModel';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createPaymentIntent: RequestHandler = async (req, res) => {
  console.log('--- 1. /create-payment-intent endpoint hit ---');
  
  const { amount } = req.body;
  const user = req.user;

  if (!user) {
    console.error('--- ERROR: No user found on request. Middleware might have failed. ---');
    res.status(401).json({ error: 'User not found. Please log in.' });
    return;
  }

  if (!amount || amount <= 0) {
    console.error(`--- ERROR: Invalid amount received: ${amount} ---`);
    res.status(400).json({ error: 'A valid amount is required.' });
    return;
  }
  
  console.log(`--- 2. Preparing to create payment for amount: ${amount}, user: ${user.email} ---`);

  try {
    console.log('--- 3. Contacting Stripe to create Payment Intent... ---');
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
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
  const sig = req.headers['stripe-signature'] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
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
        console.error('Error saving donation to database:', dbError);
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send();
}