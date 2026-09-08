import request from 'supertest';
import app from '../../app';
import UserModel from '../../models/userModel';
import Donation from '../../models/Donation/donationModel';
import Contact from '../../models/Contact/contactModel';
import { hashPassword } from '../../helpers/auth';

async function loginAs(email: string, password: string, role: 'user' | 'admin' = 'user') {
  await UserModel.create({
    name: role === 'admin' ? 'Admin' : 'User',
    email,
    password: await hashPassword(password),
    role,
  });
  const agent = request.agent(app);
  await agent.post('/login').send({ email, password });
  return agent;
}

describe('INT-RBAC: protected route wiring', () => {
  it('rejects anonymous GET /api/users/donations with 401', async () => {
    const res = await request(app).get('/api/users/donations');
    expect(res.status).toBe(401);
  });

  it('rejects anonymous PUT /api/users/profile with 401', async () => {
    const res = await request(app).put('/api/users/profile').send({ name: 'X' });
    expect(res.status).toBe(401);
  });

  it('rejects anonymous POST /api/payment/create-payment-intent with 401', async () => {
    const res = await request(app)
      .post('/api/payment/create-payment-intent')
      .send({ amount: 25 });
    expect(res.status).toBe(401);
  });

  it('rejects anonymous GET /api/admin/donations with 401', async () => {
    const res = await request(app).get('/api/admin/donations');
    expect(res.status).toBe(401);
  });

  it('rejects non-admin GET /api/admin/donations with 403', async () => {
    const agent = await loginAs('user-rbac@example.com', 'abcdef', 'user');
    const res = await agent.get('/api/admin/donations');
    expect(res.status).toBe(403);
  });

  it('allows admin GET /api/admin/donations with 200', async () => {
    const agent = await loginAs('admin-rbac@example.com', 'abcdef', 'admin');
    const res = await agent.get('/api/admin/donations');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // BUG-02: unauthenticated writes on donation/contact CMS routes
  it.failing(
    'BUG-02: anonymous POST /kindity/donation should be 401 (https://github.com/adilmusali/kindity/issues/2)',
    async () => {
      const res = await request(app)
        .post('/kindity/donation')
        .send({ header: 'H', desc: 'D' });
      expect(res.status).toBe(401);
    }
  );

  it.failing(
    'BUG-02: anonymous DELETE /kindity/donation/:id should be 401 (https://github.com/adilmusali/kindity/issues/2)',
    async () => {
      const doc = await Donation.create({ header: 'H', desc: 'D' });
      const res = await request(app).delete(`/kindity/donation/${doc._id}`);
      expect(res.status).toBe(401);
    }
  );

  it.failing(
    'BUG-02: anonymous PUT /kindity/contact/:id should be 401 (https://github.com/adilmusali/kindity/issues/2)',
    async () => {
      const doc = await Contact.create({ header: 'H', desc: 'D' });
      const res = await request(app)
        .put(`/kindity/contact/${doc._id}`)
        .send({ header: 'H2', desc: 'D2' });
      expect(res.status).toBe(401);
    }
  );

  it.failing(
    'BUG-02: anonymous DELETE /kindity/contact/:id should be 401 (https://github.com/adilmusali/kindity/issues/2)',
    async () => {
      const doc = await Contact.create({ header: 'H', desc: 'D' });
      const res = await request(app).delete(`/kindity/contact/${doc._id}`);
      expect(res.status).toBe(401);
    }
  );
});
