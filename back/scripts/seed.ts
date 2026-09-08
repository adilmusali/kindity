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
      await EventsModel.create([
        {
          img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600',
          header: 'Community Food Drive',
          desc: 'Help us pack and deliver meals to families in need this weekend.',
        },
        {
          img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600',
          header: 'School Supply Day',
          desc: 'Donate backpacks and stationery for local students.',
        },
      ]);
    }
  );

  await seedIfEmpty(
    'news',
    () => News.countDocuments(),
    async () => {
      await News.create({
        header: 'Kindity Opens New Shelter Wing',
        desc: 'Our volunteers celebrated the opening of a new wing serving 40 families.',
        img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600',
        category1: 'Shelter',
        category2: 'Community',
        category3: 'News',
        category4: 'Impact',
        user: 'Seed Admin',
      });
    }
  );

  await seedIfEmpty(
    'blog options',
    () => Options.countDocuments(),
    async () => {
      await Options.create({
        header: 'How to Volunteer',
        desc: 'Sign up for weekly shifts and join our orientation session.',
        img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600',
      });
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
      await StatModel.create([
        { header: 'Donations', desc: 'Raised this year', number: '120K', color: '#ea2c58' },
        { header: 'Volunteers', desc: 'Active helpers', number: '850', color: '#2c98ea' },
      ]);
    }
  );

  await seedIfEmpty(
    'welcome',
    () => WelcomeModel.countDocuments(),
    async () => {
      await WelcomeModel.create({
        header: 'Welcome to Kindity',
        desc: 'Together we build stronger communities through kindness.',
        donation: 120000,
        projects: 48,
        volunteers: 850,
        img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
      });
    }
  );

  await seedIfEmpty(
    'causes',
    () => CausesModel.countDocuments(),
    async () => {
      await CausesModel.create({
        img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600',
        header: 'Clean Water',
        desc: 'Fund wells and filtration for rural communities.',
        raised: 4200,
        need: 10000,
      });
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
      await Testimonial.create({
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        desc: 'Kindity made it easy to support causes I care about.',
        name: 'Jordan Lee',
        job: 'Donor',
      });
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
