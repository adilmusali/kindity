import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import UserModel from '../models/userModel';
import { hashPassword } from '../helpers/auth';
import { EventsModel } from '../models/Home/eventsModel';
import News from '../models/Blog/newsModel';
import Options from '../models/Blog/optionsModel';
import Images from '../models/Gallery/imagesModel';
import { StatModel } from '../models/Home/statModel';
import { WelcomeModel } from '../models/Home/welcomeModel';
import { CausesModel } from '../models/Home/causesModel';
import { FeaturesModel } from '../models/Home/featuresModel';
import { Testimonial } from '../models/Home/testimonialModel';
import Logo from '../models/Home/logoModel';
import Donation from '../models/Donation/donationModel';
import Contact from '../models/Contact/contactModel';
import { demoContent } from './data/demoContent';

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@kindity.test';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'admin123';
const USER_EMAIL = process.env.SEED_USER_EMAIL || 'user@kindity.test';
const USER_PASSWORD = process.env.SEED_USER_PASSWORD || 'user123';

async function upsertUser(
  email: string,
  name: string,
  password: string,
  role: 'user' | 'admin'
) {
  const existing = await UserModel.findOne({ email });
  if (existing) {
    existing.name = name;
    existing.role = role;
    existing.password = await hashPassword(password);
    await existing.save();
    console.log(`Updated user ${email} (${role})`);
    return existing;
  }
  const created = await UserModel.create({
    name,
    email,
    password: await hashPassword(password),
    role,
  });
  console.log(`Created user ${email} (${role})`);
  return created;
}

async function seedIfEmpty<T>(
  label: string,
  countFn: () => Promise<number>,
  createFn: () => Promise<unknown>
) {
  const count = await countFn();
  if (count > 0) {
    console.log(`Skip ${label}: already has ${count} document(s)`);
    return;
  }
  await createFn();
  console.log(`Seeded ${label}`);
}

async function seed() {
  const dbUrl = process.env.DB_URL;
  if (!dbUrl) {
    throw new Error('DB_URL is required to seed');
  }

  await mongoose.connect(dbUrl);
  console.log('Connected to MongoDB for seeding');

  await upsertUser(ADMIN_EMAIL, 'Seed Admin', ADMIN_PASSWORD, 'admin');
  await upsertUser(USER_EMAIL, 'Seed User', USER_PASSWORD, 'user');

  await seedIfEmpty(
    'events',
    () => EventsModel.countDocuments(),
    async () => {
      await EventsModel.create(demoContent.events);
    }
  );

  await seedIfEmpty(
    'news',
    () => News.countDocuments(),
    async () => {
      await News.create(demoContent.news);
    }
  );

  await seedIfEmpty(
    'blog options',
    () => Options.countDocuments(),
    async () => {
      await Options.create(demoContent.options);
    }
  );

  await seedIfEmpty(
    'gallery',
    () => Images.countDocuments(),
    async () => {
      await Images.create([
        { img: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800' },
        { img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800' },
      ]);
    }
  );

  await seedIfEmpty(
    'statistics',
    () => StatModel.countDocuments(),
    async () => {
      await StatModel.create(demoContent.statistics);
    }
  );

  await seedIfEmpty(
    'welcome',
    () => WelcomeModel.countDocuments(),
    async () => {
      await WelcomeModel.create(demoContent.welcome);
    }
  );

  await seedIfEmpty(
    'causes',
    () => CausesModel.countDocuments(),
    async () => {
      await CausesModel.create(demoContent.causes);
    }
  );

  await seedIfEmpty(
    'features',
    () => FeaturesModel.countDocuments(),
    async () => {
      await FeaturesModel.create({
        logo: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2764.png',
        header: 'Transparent Giving',
        desc: 'Track every donation from pledge to impact.',
      });
    }
  );

  await seedIfEmpty(
    'testimonials',
    () => Testimonial.countDocuments(),
    async () => {
      await Testimonial.create(demoContent.testimonial);
    }
  );

  await seedIfEmpty(
    'logos',
    () => Logo.countDocuments(),
    async () => {
      await Logo.create({
        img: 'https://preview.colorlib.com/theme/kindity/img/logo.png.webp',
      });
    }
  );

  await seedIfEmpty(
    'donation page content',
    () => Donation.countDocuments(),
    async () => {
      await Donation.create({
        header: 'Make a Donation',
        desc: 'Your gift funds food, shelter, and education programs.',
      });
    }
  );

  await seedIfEmpty(
    'contact page content',
    () => Contact.countDocuments(),
    async () => {
      await Contact.create({
        header: 'Contact Us',
        desc: 'Reach our team at hello@kindity.test',
      });
    }
  );

  await mongoose.disconnect();
  console.log('Seeding complete');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
