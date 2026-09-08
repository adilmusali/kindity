import request from 'supertest';
import app from '../../app';
import UserModel from '../../models/userModel';
import { hashPassword } from '../../helpers/auth';

describe('INT-AUTH: auth routes', () => {
  it('register -> cookie -> profile -> logout -> profile 401', async () => {
    const agent = request.agent(app);

    const register = await agent.post('/register').send({
      name: 'Flow User',
      email: 'flow@example.com',
      password: 'abcdef',
    });
    expect(register.status).toBe(201);
    expect(register.headers['set-cookie']).toBeDefined();

    const profile = await agent.get('/profile');
    expect(profile.status).toBe(200);
    expect(profile.body.email).toBe('flow@example.com');

    const logout = await agent.post('/logout');
    expect(logout.status).toBe(200);

    const profileAfter = await agent.get('/profile');
    expect(profileAfter.status).toBe(401);
  });

  it('rejects duplicate registration email with 400', async () => {
    await request(app).post('/register').send({
      name: 'First',
      email: 'dup-int@example.com',
      password: 'abcdef',
    });
    const second = await request(app).post('/register').send({
      name: 'Second',
      email: 'dup-int@example.com',
      password: 'abcdef',
    });
    expect(second.status).toBe(400);
  });

  it('login sets cookie for existing user', async () => {
    await UserModel.create({
      name: 'Login',
      email: 'login-int@example.com',
      password: await hashPassword('secret1'),
    });
    const res = await request(app).post('/login').send({
      email: 'login-int@example.com',
      password: 'secret1',
    });
    expect(res.status).toBe(200);
    expect(res.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringMatching(/token=/)])
    );
  });
});
