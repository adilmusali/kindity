import request from 'supertest';
import app from '../../app';
import UserModel from '../../models/userModel';
import { hashPassword } from '../../helpers/auth';

describe('INT-AUTH: auth routes', () => {
  it.each(['production', 'test'])(
    'BUG-05: registration, login, and logout share cookie settings in %s',
    async (environment) => {
      const previousEnvironment = process.env.NODE_ENV;
      try {
        process.env.NODE_ENV = environment;
        const credentials = { email: 'cookie-flow@example.com', password: 'abcdef' };
        const registered = await request(app).post('/register').send({
          name: 'Cookie Flow', ...credentials,
        });
        expect(registered.status).toBe(201);
        const loggedIn = await request(app).post('/login').send(credentials);
        expect(loggedIn.status).toBe(200);
        const loggedOut = await request(app).post('/logout');
        expect(loggedOut.status).toBe(200);

        const cookies = [registered, loggedIn, loggedOut].map(
          (response) => response.headers['set-cookie'][0] as string
        );
        for (const cookie of cookies) {
          expect(cookie).toContain('HttpOnly');
          expect(cookie).toContain('Path=/');
          expect(cookie).toContain(environment === 'production' ? 'SameSite=None' : 'SameSite=Strict');
          expect(cookie.includes('; Secure')).toBe(environment === 'production');
        }
        expect(cookies[0]).toContain('Max-Age=86400');
        expect(cookies[1]).toContain('Max-Age=86400');
        expect(cookies[2]).toContain('token=;');
        expect(cookies[2]).toContain('Expires=Thu, 01 Jan 1970 00:00:00 GMT');
        expect(cookies[2]).not.toContain('Max-Age=');

        // Send the cookie explicitly: this HTTP client does not model browser cross-site policy.
        const origin = process.env.CLIENT_URL || 'http://localhost:5173';
        const profile = await request(app).get('/profile')
          .set('Origin', origin).set('Cookie', cookies[1].split(';')[0]);
        expect(profile.status).toBe(200);
        expect(profile.body.email).toBe(credentials.email);
        expect(profile.headers['access-control-allow-origin']).toBe(origin);
        expect(profile.headers['access-control-allow-credentials']).toBe('true');
        const cleared = await request(app).get('/profile')
          .set('Cookie', cookies[2].split(';')[0]);
        expect(cleared.status).toBe(401);
      } finally {
        if (previousEnvironment === undefined) delete process.env.NODE_ENV;
        else process.env.NODE_ENV = previousEnvironment;
      }
    }
  );

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

  it('ignores an admin role supplied during registration', async () => {
    const agent = request.agent(app);
    const register = await agent.post('/register').send({
      name: 'Regular User',
      email: 'role-int@example.com',
      password: 'abcdef',
      role: 'admin',
    });

    expect(register.status).toBe(201);
    expect(register.body.user.role).toBe('user');
    const created = await UserModel.findOne({ email: 'role-int@example.com' });
    expect(created?.role).toBe('user');

    const adminDonations = await agent.get('/api/admin/donations');
    expect(adminDonations.status).toBe(403);
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
