import { RequestHandler } from 'express';
import { WelcomeModel } from '../models/Home/welcomeModel';
import { FeaturesModel } from '../models/Home/featuresModel';
import { Testimonial } from '../models/Home/testimonialModel';
import Logo from '../models/Home/logoModel';

export const getAboutContent: RequestHandler = async (req, res) => {
  try {
    const [
      welcome,
      features,
      testimonial,
      logo,
    ] = await Promise.all([
      WelcomeModel.find({}),
      FeaturesModel.find({}),
      Testimonial.find({}),
      Logo.find({}),
    ]);

    res.status(200).json({
      welcome,
      features,
      testimonial,
      logo,
    });
  } catch (error) {
    console.error("Error fetching about page content:", error);
    res.status(500).json({ error: 'Failed to load about page content.' });
  }
};