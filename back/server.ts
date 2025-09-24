import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import statRoute from "./routes/Home/statRoute";
import welcomeRoute from "./routes/Home/welcomeRoute";
import causesRoute from "./routes/Home/causesRoute";
import featuresRoute from "./routes/Home/featuresRoute";
import eventsRoute from "./routes/Home/eventsRoute";
import testimonialRoute from "./routes/Home/testimonialRoute";
import imagesRoute from "./routes/Gallery/imagesRoute";
import logoRoute from "./routes/Home/logoRoute";
import donationRoute from "./routes/Donation/donationRoute";
import contactRoute from "./routes/Contact/contactRoute";
import newsRoute from "./routes/Blog/newsRoute";
import optionsRoute from "./routes/Blog/optionsRoute";
import authRoutes from "./routes/authRoutes";

dotenv.config()

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

//Home
app.use("/kindity/home/statistics", statRoute)
app.use("/kindity/home/welcome", welcomeRoute)
app.use("/kindity/home/causes", causesRoute)
app.use("/kindity/home/features", featuresRoute)
app.use("/kindity/home/events", eventsRoute)
app.use("/kindity/home/testimonial", testimonialRoute)
app.use("/kindity/home/logo", logoRoute)

//Gallery
app.use("/kindity/gallery", imagesRoute)

//Donation
app.use("/kindity/donation", donationRoute)

//Contact
app.use("/kindity/contact", contactRoute)

//Blog
app.use("/kindity/blog/news", newsRoute)
app.use("/kindity/blog/options", optionsRoute)

//Auth
app.use("/", authRoutes)

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL!)
  .then(() => {
    console.log('MongoDB Connected...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));