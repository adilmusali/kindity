import request from 'supertest';
import app from '../../app';
import UserModel from '../../models/userModel';
import { EventsModel } from '../../models/Home/eventsModel';
import News from '../../models/Blog/newsModel';
import { hashPassword } from '../../helpers/auth';

async function loginAs(role: 'user' | 'admin') {
  const email = `${role}-${Date.now()}-${Math.random()}@example.com`;
  const password = 'abcdef';
  await UserModel.create({
    name: role,
    email,
    password: await hashPassword(password),
    role,
  });
  const agent = request.agent(app);
  await agent.post('/login').send({ email, password });
  return agent;
}

describe('INT-CONTENT: admin content creation (BUG-03)', () => {
  it('requires admin access and persists new events', async () => {
    const path = '/api/events';
    const data = { img: 'https://example.com/e.jpg', header: 'Event', desc: 'Desc' };
    expect((await request(app).post(path).send(data)).status).toBe(401);
    expect((await (await loginAs('user')).post(path).send(data)).status).toBe(403);

    const response = await (await loginAs('admin')).post(path).send(data);
    expect(response.status).toBe(201);
    expect(response.body.header).toBe(data.header);
    expect(await EventsModel.countDocuments({ header: data.header })).toBe(1);
  });

  it('requires admin access, validates, and persists new news', async () => {
    const path = '/api/news';
    const data = {
      header: 'News', desc: 'Desc', img: 'https://example.com/n.jpg',
      category1: 'a', category2: 'b', category3: 'c', category4: 'd', user: 'admin',
    };
    expect((await request(app).post(path).send(data)).status).toBe(401);
    expect((await (await loginAs('user')).post(path).send(data)).status).toBe(403);

    const admin = await loginAs('admin');
    expect((await admin.post(path).send({ header: 'Missing required fields' })).status).toBe(400);
    const response = await admin.post(path).send(data);
    expect(response.status).toBe(201);
    expect(response.body.header).toBe(data.header);
    expect(await News.countDocuments({ header: data.header })).toBe(1);
  });

  it('GET /api/events returns 200 array', async () => {
    const res = await request(app).get('/api/events');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/home-content returns 200 object', async () => {
    const res = await request(app).get('/api/home-content');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        statistics: expect.any(Array),
        welcome: expect.any(Array),
        events: expect.any(Array),
      })
    );
  });

  it('GET /api/blog returns 200 with news and options', async () => {
    const res = await request(app).get('/api/blog');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        news: expect.any(Array),
        options: expect.any(Array),
      })
    );
  });

  it('GET /api/gallery returns 200 array', async () => {
    const res = await request(app).get('/api/gallery');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
