import { Request, Response } from 'express';
import {
  getDonationHistory,
  updateUserProfile,
} from '../../controllers/userController';
import UserModel from '../../models/userModel';
import DonationHistoryModel from '../../models/donationHistoryModel';
import { hashPassword } from '../../helpers/auth';

const mockRes = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

afterEach(() => jest.restoreAllMocks());

describe('UNIT-USER: getDonationHistory', () => {
  it('BUG-08: returns a controlled 500 when the history query rejects', async () => {
    const query = DonationHistoryModel.find();
    jest.spyOn(query, 'exec').mockRejectedValueOnce(new Error('private DB details'));
    jest.spyOn(DonationHistoryModel, 'find').mockReturnValueOnce(query);
    const req = { user: { _id: '507f1f77bcf86cd799439011' } } as unknown as Request;
    const res = mockRes();
    await getDonationHistory(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unable to load donation history.' });
  });
  it('returns only the requesting user donations sorted newest first', async () => {
    const userA = await UserModel.create({
      name: 'A',
      email: 'a@example.com',
      password: await hashPassword('abcdef'),
    });
    const userB = await UserModel.create({
      name: 'B',
      email: 'b@example.com',
      password: await hashPassword('abcdef'),
    });

    await DonationHistoryModel.create({
      user: userA._id,
      amount: 10,
      currency: 'usd',
      stripePaymentId: 'pi_a_old',
      status: 'succeeded',
      createdAt: new Date('2024-01-01'),
    });
    await DonationHistoryModel.create({
      user: userA._id,
      amount: 20,
      currency: 'usd',
      stripePaymentId: 'pi_a_new',
      status: 'succeeded',
      createdAt: new Date('2024-06-01'),
    });
    await DonationHistoryModel.create({
      user: userB._id,
      amount: 99,
      currency: 'usd',
      stripePaymentId: 'pi_b',
      status: 'succeeded',
    });

    const req = { user: userA } as unknown as Request;
    const res = mockRes();
    await getDonationHistory(req, res, jest.fn());

    expect(res.json).toHaveBeenCalled();
    const donations = (res.json as jest.Mock).mock.calls[0][0];
    expect(donations).toHaveLength(2);
    expect(donations[0].stripePaymentId).toBe('pi_a_new');
    expect(donations[1].stripePaymentId).toBe('pi_a_old');
  });
});

describe('UNIT-USER: updateUserProfile', () => {
  it('BUG-08: returns a controlled 500 when profile lookup rejects', async () => {
    const query = UserModel.findById('507f1f77bcf86cd799439011');
    jest.spyOn(query, 'exec').mockRejectedValueOnce(new Error('private DB details'));
    jest.spyOn(UserModel, 'findById').mockReturnValueOnce(query);
    const req = {
      user: { _id: '507f1f77bcf86cd799439011' }, body: { name: 'Changed' },
    } as unknown as Request;
    const res = mockRes();
    await updateUserProfile(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unable to update profile.' });
  });
  it('updates name and email for the authenticated user', async () => {
    const user = await UserModel.create({
      name: 'Old',
      email: 'old@example.com',
      password: await hashPassword('abcdef'),
    });
    const req = {
      user,
      body: { name: 'New Name', email: 'new@example.com' },
    } as unknown as Request;
    const res = mockRes();
    await updateUserProfile(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'New Name', email: 'new@example.com' })
    );
  });

  it('returns 400 when user not found', async () => {
    const req = {
      user: { _id: '507f1f77bcf86cd799439011' },
      body: { name: 'X' },
    } as unknown as Request;
    const res = mockRes();
    await updateUserProfile(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it(
    'BUG-08: returns 409 when changing email to an existing one (https://github.com/adilmusali/kindity/issues/8)',
    async () => {
      await UserModel.create({
        name: 'Taken',
        email: 'taken@example.com',
        password: await hashPassword('abcdef'),
      });
      const user = await UserModel.create({
        name: 'Me',
        email: 'me@example.com',
        password: await hashPassword('abcdef'),
      });
      const req = {
        user,
        body: { email: 'taken@example.com' },
      } as unknown as Request;
      const res = mockRes();
      await updateUserProfile(req, res, jest.fn());
      const statusCalls = (res.status as jest.Mock).mock.calls;
      expect(statusCalls.length).toBeGreaterThan(0);
      const code = statusCalls[0][0];
      expect(code).toBe(409);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email is already in use.' });
      expect((await UserModel.findById(user._id))!.email).toBe('me@example.com');
    }
  );
});
