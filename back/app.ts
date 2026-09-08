import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import homeContentRoute from './routes/Home/homeContentRoute';
import eventsRoute from './routes/eventsRoutes';
import aboutRoute from './routes/aboutRoutes';
import blogRoute from './routes/blogRoutes';
import newsRoute from './routes/newsRoutes';
import galleryRoute from './routes/galleryRoutes';
import donationRoute from './routes/Donation/donationRoute';
import contactRoute from './routes/Contact/contactRoute';
import authRoutes from './routes/authRoutes';
import paymentRoutes from './routes/paymentRoutes';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

// Payment routes must be registered before express.json() so the webhook
// can receive the raw body for Stripe signature verification.
app.use('/api/payment', paymentRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/home-content', homeContentRoute);
app.use('/api/events', eventsRoute);
app.use('/api/about', aboutRoute);
app.use('/api/news', newsRoute);
app.use('/api/gallery', galleryRoute);
app.use('/kindity/donation', donationRoute);
app.use('/kindity/contact', contactRoute);
app.use('/api/blog', blogRoute);
app.use('/', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

export default app;
