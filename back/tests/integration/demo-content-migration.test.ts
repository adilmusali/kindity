import mongoose from 'mongoose';
import { EventsModel } from '../../models/Home/eventsModel';
import UserModel from '../../models/userModel';
import DonationHistoryModel from '../../models/donationHistoryModel';
import { migrateDemoContent } from '../../scripts/migrateDemoContent';

const legacyEvent = {
  img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600',
  header: 'Community Food Drive',
  desc: 'Help us pack and deliver meals to families in need this weekend.',
};

describe('demo content migration', () => {
  it('previews, updates once, skips edited records, and restores saved originals', async () => {
    const db = mongoose.connection.db!;
    const original = await EventsModel.create(legacyEvent);
    const edited = await EventsModel.create({ ...legacyEvent, desc: 'An editor changed this description.' });
    const unrelated = await EventsModel.create({ img: legacyEvent.img, header: 'Independent event', desc: 'Keep this event.' });
    const user = await UserModel.create({ name: 'Existing user', email: 'content-test@example.com', password: 'abcdef', role: 'user' });
    const donation = await DonationHistoryModel.create({ user: user._id, amount: 2500, currency: 'usd', stripePaymentId: 'pi_content_test', status: 'succeeded' });
    const userBefore = await db.collection('users').findOne({ _id: user._id });
    const donationBefore = await db.collection('donationhistories').findOne({ _id: donation._id });

    const preview = await migrateDemoContent(db);
    expect(preview.mode).toBe('dry-run');
    expect('matched' in preview && preview.matched).toBe(1);
    expect((await EventsModel.findById(original._id))?.isDemo).toBeUndefined();
    expect(await db.collection('contentMigrationBackups').countDocuments()).toBe(0);

    const applied = await migrateDemoContent(db, { apply: true });
    expect('matched' in applied && applied.matched).toBe(1);
    const migrationId = (applied as { migrationId: string }).migrationId;
    expect(migrationId).toBeTruthy();
    expect((await EventsModel.findById(original._id))?.isDemo).toBe(true);
    expect((await EventsModel.findById(edited._id))?.desc).toBe(edited.desc);
    expect((await EventsModel.findById(unrelated._id))?.header).toBe('Independent event');
    const repeated = await migrateDemoContent(db, { apply: true });
    expect('matched' in repeated && repeated.matched).toBe(0);
    expect(await db.collection('contentMigrationBackups').countDocuments({ migrationId })).toBe(1);
    expect(await db.collection('users').findOne({ _id: user._id })).toEqual(userBefore);
    expect(await db.collection('donationhistories').findOne({ _id: donation._id })).toEqual(donationBefore);

    const rollbackPreview = await migrateDemoContent(db, { rollbackId: migrationId });
    expect(rollbackPreview.mode).toBe('rollback dry-run');
    expect((await EventsModel.findById(original._id))?.isDemo).toBe(true);

    const restored = await migrateDemoContent(db, { rollbackId: migrationId, apply: true });
    expect(restored.mode).toBe('rollback');
    expect((await EventsModel.findById(original._id))?.toObject()).toEqual(original.toObject());
    expect(await db.collection('contentMigrationBackups').countDocuments({ migrationId })).toBe(0);
  });
});
