import 'dotenv/config';
import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import { demoContent } from './data/demoContent';

type ContentSpec = { collection: string; legacy: Record<string, unknown>; replacement: Record<string, unknown> };

// Exact values from the previous seed. Every field must still match, so edited
// records and records from other sources are deliberately skipped.
const specs: ContentSpec[] = [
  { collection: 'events', legacy: { img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600', header: 'Community Food Drive', desc: 'Help us pack and deliver meals to families in need this weekend.' }, replacement: demoContent.events[0] },
  { collection: 'events', legacy: { img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600', header: 'School Supply Day', desc: 'Donate backpacks and stationery for local students.' }, replacement: demoContent.events[1] },
  { collection: 'news', legacy: { header: 'Kindity Opens New Shelter Wing', desc: 'Our volunteers celebrated the opening of a new wing serving 40 families.', img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600', category1: 'Shelter', category2: 'Community', category3: 'News', category4: 'Impact', user: 'Seed Admin' }, replacement: demoContent.news },
  { collection: 'options', legacy: { header: 'How to Volunteer', desc: 'Sign up for weekly shifts and join our orientation session.', img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600' }, replacement: demoContent.options },
  { collection: 'statistics', legacy: { header: 'Donations', desc: 'Raised this year', number: '120K', color: '#ea2c58' }, replacement: demoContent.statistics[0] },
  { collection: 'statistics', legacy: { header: 'Volunteers', desc: 'Active helpers', number: '850', color: '#2c98ea' }, replacement: demoContent.statistics[1] },
  { collection: 'welcome', legacy: { header: 'Welcome to Kindity', desc: 'Together we build stronger communities through kindness.', donation: 120000, projects: 48, volunteers: 850, img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800' }, replacement: demoContent.welcome },
  { collection: 'causes', legacy: { img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600', header: 'Clean Water', desc: 'Fund wells and filtration for rural communities.', raised: 4200, need: 10000 }, replacement: demoContent.causes },
  { collection: 'testimonials', legacy: { img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', desc: 'Kindity made it easy to support causes I care about.', name: 'Jordan Lee', job: 'Donor' }, replacement: demoContent.testimonial },
];

const equal = (left: unknown, right: unknown) => JSON.stringify(left) === JSON.stringify(right);

async function run() {
  const dbUrl = process.env.DB_URL;
  if (!dbUrl) throw new Error('DB_URL is required');
  const rollbackId = process.argv.find((arg) => arg.startsWith('--rollback='))?.split('=')[1];
  const apply = process.argv.includes('--apply');
  if (rollbackId && apply) throw new Error('Choose either --rollback=<id> or --apply');
  await mongoose.connect(dbUrl);
  const db = mongoose.connection.db!;
  const backups = db.collection('contentMigrationBackups');

  try {
    if (rollbackId) {
      const saved = await backups.find({ migrationId: rollbackId }).toArray();
      if (!saved.length) throw new Error(`No saved originals found for migration ${rollbackId}`);
      if (!apply) {
        console.log(JSON.stringify({ mode: 'rollback dry-run', migrationId: rollbackId, restoreCount: saved.length }, null, 2));
        return;
      }
      for (const entry of saved) {
        const original = entry.original as Record<string, unknown>;
        await db.collection(entry.collection as string).replaceOne({ _id: original._id }, original);
      }
      await backups.deleteMany({ migrationId: rollbackId });
      console.log(`Restored ${saved.length} document(s) from ${rollbackId}`);
      return;
    }

    const matches: Array<{ collection: string; original: Record<string, unknown>; replacement: Record<string, unknown> }> = [];
    let ambiguousPatternCount = 0;
    for (const spec of specs) {
      const candidates = await db.collection(spec.collection).find(spec.legacy).toArray();
      const exactMatches = candidates.filter((candidate) => {
        if (candidate.isDemo !== undefined) return false;
        const mutableKeys = Object.keys(candidate).filter((key) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key)).sort();
        const expectedKeys = Object.keys(spec.legacy).sort();
        return equal(mutableKeys, expectedKeys) && expectedKeys.every((key) => equal(candidate[key], spec.legacy[key]));
      });
      if (exactMatches.length > 1) {
        ambiguousPatternCount += 1;
        continue;
      }
      if (exactMatches.length === 0) continue;
      matches.push({ collection: spec.collection, original: exactMatches[0], replacement: spec.replacement as unknown as Record<string, unknown> });
    }
    const report = { mode: apply ? 'apply' : 'dry-run', reviewedLegacyPatterns: specs.length, matched: matches.length, ambiguousPatternsSkipped: ambiguousPatternCount, editedOrUnrecognizedRecords: 'Skipped because they did not match a complete reviewed legacy fixture', matches: matches.map(({ collection, original, replacement }) => ({ collection, id: String(original._id), from: original, to: replacement })) };
    console.log(JSON.stringify(report, null, 2));
    if (!apply || !matches.length) return;

    const migrationId = `${new Date().toISOString().replace(/[-:.TZ]/g, '')}-${randomUUID()}`;
    for (const match of matches) {
      await backups.insertOne({ migrationId, collection: match.collection, original: match.original, savedAt: new Date() });
      const { _id, ...replacementFields } = match.replacement;
      await db.collection(match.collection).updateOne({ _id: match.original._id }, { $set: replacementFields });
    }
    console.log(`Applied ${matches.length} update(s). Roll back with --rollback=${migrationId} (dry-run first, add --apply to restore).`);
  } finally {
    await mongoose.disconnect();
  }
}

run().catch((error) => { console.error(error); process.exitCode = 1; });
