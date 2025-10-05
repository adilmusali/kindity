import { RequestHandler } from "express";
import { StatModel } from "../models/Home/statModel";
import { WelcomeModel } from "../models/Home/welcomeModel";
import { CausesModel } from "../models/Home/causesModel";
import { FeaturesModel } from "../models/Home/featuresModel";
import { EventsModel } from "../models/Home/eventsModel";
import { Testimonial } from "../models/Home/testimonialModel";
import Logo from "../models/Home/logoModel";

export const getHomeContent: RequestHandler = async (req, res) => {
    try {
        const [
            statistics,
            welcome,
            causes,
            features,
            events,
            testimonial,
            logo,
        ] = await Promise.all([
            StatModel.find({}),
            WelcomeModel.find({}),
            CausesModel.find({}),
            FeaturesModel.find({}),
            EventsModel.find({}),
            Testimonial.find({}),
            Logo.find({}),
        ]);

        res.status(200).json({
            statistics,
            welcome,
            causes,
            features,
            events,
            testimonial,
            logo,
        })
    } catch (error) {
        console.error("Error fetching home page content:", error);
        res.status(500).json({ error: 'Failed to load home page content.' });
    }
}