import request from 'supertest';
import app from '../../app';
import UserModel from '../../models/userModel';
import DonationHistoryModel from '../../models/donationHistoryModel';

describe('INT-USER: controlled profile and history errors (BUG-08)', () => {
  let agent: ReturnType<typeof request.agent>;

  beforeEach(async () => {
    agent = request.agent(app);
    const registered = await agent.post('/register').send({
      name: 'Original', email: 'original@example.com', password: 'abcdef',
    });
    expect(registered.status).toBe(201);
  });
  afterEach(() => jest.restoreAllMocks());

  it('returns 409 for duplicate email and keeps both stored profiles unchanged', async () => {
    await request(app).post('/register').send({
      name: 'Taken', email: 'taken@example.com', password: 'abcdef',
    });
    const response = await agent.put('/api/users/profile').send({
      name: 'Changed', email: 'taken@example.com',
    });
    expect(response.status).toBe(409);
    expect(response.body).toEqual({ error: 'Email is already in use.' });
    expect((await UserModel.findOne({ email: 'original@example.com' }))!.name).toBe('Original');
    expect((await UserModel.findOne({ email: 'taken@example.com' }))!.name).toBe('Taken');
  });

  it('returns 400 for an invalid profile and allows a later valid update', async () => {
    const invalid = await agent.put('/api/users/profile').send({ email: 'invalid' });
    expect(invalid.status).toBe(400);
    expect(invalid.body).toEqual({ error: 'Invalid profile data.' });
    const updated = await agent.put('/api/users/profile').send({ name: 'Updated' });
    expect(updated.status).toBe(200);
    expect(updated.body.name).toBe('Updated');
    expect(updated.body).not.toHaveProperty('password');
  });

  it('returns a controlled 500 for a profile save failure', async () => {
    jest.spyOn(UserModel.prototype, 'save').mockRejectedValueOnce(new Error('private DB details'));
    const response = await agent.put('/api/users/profile').send({ name: 'Changed' });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Unable to update profile.' });
    expect((await UserModel.findOne({ email: 'original@example.com' }))!.name).toBe('Original');
  });

  it('returns a controlled 500 for a donation history query failure', async () => {
    const query = DonationHistoryModel.find();
    jest.spyOn(query, 'exec').mockRejectedValueOnce(new Error('private DB details'));
    jest.spyOn(DonationHistoryModel, 'find').mockReturnValueOnce(query);
    const response = await agent.get('/api/users/donations');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Unable to load donation history.' });
    const retry = await agent.get('/api/users/donations');
    expect(retry.status).toBe(200);
    expect(retry.body).toEqual([]);
  });
});
