import { RequestHandler } from 'express';
import Stripe from 'stripe';
import DonationHistoryModel from '../models/donationHistoryModel';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createPaymentIntent: RequestHandler = async (req, res) => {
  const { amount } = req.body;

  const user = req.user;

  if (!user) {
    res.status(401).json({ error: 'User not found. Please log in.' });
    return;
  }

  if (!amount || amount <= 0) {
    return;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        userId: user._id.toString(),
      }
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
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