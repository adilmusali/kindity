import express from 'express';
import request from 'supertest';
import { createLoginRateLimiter } from '../../middleware/loginRateLimit';
import app from '../../app';

it('BUG-10: the real login route throttles repeated failed attempts with a retry hint', async () => {
  for (let attempt = 0; attempt < 20; attempt++) {
    const response = await request(app).post('/login').send({ email: 'absent@example.com', password: 'wrong' });
    expect(response.status).toBe(401);
  }
  const limited = await request(app).post('/login').send({ email: 'absent@example.com', password: 'wrong' });
  expect(limited.status).toBe(429);
  expect(limited.body).toEqual({ error: 'Too many login attempts. Please try again later.' });
  expect(Number(limited.headers['retry-after'])).toBeGreaterThan(0);
  expect(limited.headers.ratelimit).toBeDefined();
  expect(limited.headers['set-cookie']).toBeUndefined();
});

it('BUG-10: successful requests do not consume the failed-login allowance', async () => {
  const isolatedApp = express();
  isolatedApp.post('/login', createLoginRateLimiter(), (req, res) => {
    res.sendStatus(req.query.fail ? 401 : 200);
  });
  for (let attempt = 0; attempt < 25; attempt++) {
    expect((await request(isolatedApp).post('/login')).status).toBe(200);
  }
  for (let attempt = 0; attempt < 20; attempt++) {
    expect((await request(isolatedApp).post('/login?fail=1')).status).toBe(401);
  }
  expect((await request(isolatedApp).post('/login?fail=1')).status).toBe(429);
});
