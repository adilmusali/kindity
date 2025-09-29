import express from 'express';
import { createPaymentIntent, handleStripeWebhook } from '../controllers/paymentController';
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/create-payment-intent', express.json(), protect, createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);
export default router;