import { test, expect } from '../fixtures/pages';
import { uniqueEmail } from '../fixtures/users';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-kindity-qa';

test.describe('API-AUTH', () => {
  test('registers with Set-Cookie httpOnly token', async ({ asAnon }) => {
    const email = uniqueEmail('reg');
    const res = await asAnon.post('/register', {
      data: { name: 'Reg User', email, password: 'abcdef' },
    });
    expect(res.status()).toBe(201);
    const setCookie = res.headers()['set-cookie'] || '';
    expect(setCookie.toLowerCase()).toContain('httponly');
    expect(setCookie).toMatch(/token=/);
  });

  test('rejects duplicate email with 400', async ({ asAnon }) => {
    const email = uniqueEmail('dup');
    await asAnon.post('/register', {
      data: { name: 'A', email, password: 'abcdef' },
    });
    const res = await asAnon.post('/register', {
      data: { name: 'B', email, password: 'abcdef' },
    });
    expect(res.status()).toBe(400);
  });

  test('password boundary: 5 chars rejected, 6 chars accepted', async ({ asAnon }) => {
    const short = await asAnon.post('/register', {
      data: { name: 'S', email: uniqueEmail('short'), password: 'abcde' },
    });
    expect(short.status()).toBe(400);

    const ok = await asAnon.post('/register', {
      data: { name: 'O', email: uniqueEmail('ok'), password: 'abcdef' },
    });
    expect(ok.status()).toBe(201);
  });

  test('login success and failure paths', async ({ asAnon, freshUser }) => {
    const ok = await asAnon.post('/login', {
      data: { email: freshUser.email, password: freshUser.password },
    });
    expect(ok.status()).toBe(200);

    const badPw = await asAnon.post('/login', {
      data: { email: freshUser.email, password: 'wrong!!' },
    });
    expect(badPw.status()).toBe(401);

    const unknown = await asAnon.post('/login', {
      data: { email: 'nobody@kindity.test', password: 'abcdef' },
    });
    expect(unknown.status()).toBe(401);
  });

  test('profile rejects missing, tampered, and expired tokens', async ({ asAnon }) => {
    const missing = await asAnon.get('/profile');
    expect(missing.status()).toBe(401);

    const tampered = await asAnon.get('/profile', {
      headers: { Cookie: 'token=not.a.jwt' },
    });
    expect(tampered.status()).toBe(401);

    const expired = jwt.sign(
      { id: '507f1f77bcf86cd799439011', email: 'x@y.com', role: 'user' },
      JWT_SECRET,
      { expiresIn: -10 }
    );
    const expiredRes = await asAnon.get('/profile', {
      headers: { Cookie: `token=${expired}` },
    });
    expect(expiredRes.status()).toBe(401);
  });

  test('logout clears session cookie', async ({ freshUser }) => {
    const logout = await freshUser.context.post('/logout');
    expect(logout.status()).toBe(200);
    const setCookie = logout.headers()['set-cookie'] || '';
    expect(setCookie).toMatch(/token=;/i);
    const profile = await freshUser.context.get('/profile');
    expect(profile.status()).toBe(401);
  });

  test.fail(
    'BUG-01 #1: register with role=admin must not escalate privileges',
    async ({ asAnon }) => {
      const email = uniqueEmail('escalate');
      const res = await asAnon.post('/register', {
        data: {
          name: 'Hacker',
          email,
          password: 'abcdef',
          role: 'admin',
        },
      });
      expect(res.status()).toBe(201);
      const body = await res.json();
      expect(body.user.role).toBe('user');

      const login = await asAnon.post('/login', {
        data: { email, password: 'abcdef' },
      });
      expect(login.status()).toBe(200);
      const admin = await asAnon.get('/api/admin/donations');
      // After fix, even if somehow logged in, role should be user -> 403
      // Current bug: role admin -> 200
      expect([401, 403]).toContain(admin.status());
    }
  );
});
