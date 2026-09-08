import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from '../../controllers/authControllers';
import UserModel from '../../models/userModel';
import { hashPassword } from '../../helpers/auth';

const mockRes = () => {
  const res: Partial<Response> & { cookies: Record<string, unknown> } = {
    cookies: {},
  };
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockImplementation((name: string, value: string, opts?: object) => {
    res.cookies[name] = { value, opts };
    return res;
  });
  return res as Response & { cookies: Record<string, { value: string; opts?: object }> };
};

describe('UNIT-AUTH-CTRL: registerUser', () => {
  it('returns 400 when name is missing', async () => {
    const req = { body: { email: 'a@b.com', password: 'abcdef' } } as unknown as Request;
    const res = mockRes();
    await registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 when email is missing', async () => {
    const req = { body: { name: 'A', password: 'abcdef' } } as unknown as Request;
    const res = mockRes();
    await registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 when password is shorter than 6 characters', async () => {
    const req = { body: { name: 'A', email: 'a@b.com', password: 'abcde' } } as unknown as Request;
    const res = mockRes();
    await registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringMatching(/at least 6/i) })
    );
  });

  it('accepts a 6-character password (boundary)', async () => {
    const req = {
      body: { name: 'Boundary', email: 'boundary@example.com', password: 'abcdef' },
    } as unknown as Request;
    const res = mockRes();
    await registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('returns 400 for duplicate email', async () => {
    await UserModel.create({
      name: 'Existing',
      email: 'dup@example.com',
      password: await hashPassword('abcdef'),
    });
    const req = {
      body: { name: 'New', email: 'dup@example.com', password: 'abcdef' },
    } as unknown as Request;
    const res = mockRes();
    await registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringMatching(/already exists/i) })
    );
  });

  it('sets HttpOnly cookie with MaxAge on successful register', async () => {
    const req = {
      body: { name: 'Cookie', email: 'cookie@example.com', password: 'abcdef' },
    } as unknown as Request;
    const res = mockRes();
    await registerUser(req, res);
    expect(res.cookie).toHaveBeenCalledWith(
      'token',
      expect.any(String),
      expect.objectContaining({
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
    );
  });

  it('does not set Secure flag when NODE_ENV is not production', async () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test';
    const req = {
      body: { name: 'Insecure', email: 'insecure@example.com', password: 'abcdef' },
    } as unknown as Request;
    const res = mockRes();
    await registerUser(req, res);
    expect(res.cookie).toHaveBeenCalledWith(
      'token',
      expect.any(String),
      expect.objectContaining({ secure: false })
    );
    process.env.NODE_ENV = prev;
  });

  // BUG-01: privilege escalation via role in request body
  it.failing(
    'BUG-01: ignores role from body and always assigns user (https://github.com/adilmusali/kindity/issues?q=BUG-01)',
    async () => {
      const req = {
        body: {
          name: 'Hacker',
          email: 'hacker@example.com',
          password: 'abcdef',
          role: 'admin',
        },
      } as unknown as Request;
      const res = mockRes();
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      const created = await UserModel.findOne({ email: 'hacker@example.com' });
      expect(created!.role).toBe('user');
    }
  );

  // BUG-05: sameSite strict breaks cross-site Azure cookies
  it.failing(
    'BUG-05: production cookie should use SameSite=None with Secure (https://github.com/adilmusali/kindity/issues?q=BUG-05)',
    async () => {
      const prev = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      const req = {
        body: { name: 'Prod', email: 'prod@example.com', password: 'abcdef' },
      } as unknown as Request;
      const res = mockRes();
      await registerUser(req, res);
      expect(res.cookie).toHaveBeenCalledWith(
        'token',
        expect.any(String),
        expect.objectContaining({
          sameSite: 'none',
          secure: true,
        })
      );
      process.env.NODE_ENV = prev;
    }
  );
});

describe('UNIT-AUTH-CTRL: loginUser', () => {
  beforeEach(async () => {
    await UserModel.create({
      name: 'Login User',
      email: 'login@example.com',
      password: await hashPassword('secret1'),
      role: 'user',
    });
  });

  it('returns 400 when email or password missing', async () => {
    const req = { body: { email: 'login@example.com' } } as unknown as Request;
    const res = mockRes();
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 401 for unknown email', async () => {
    const req = { body: { email: 'nope@example.com', password: 'secret1' } } as unknown as Request;
    const res = mockRes();
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('returns 401 for wrong password', async () => {
    const req = { body: { email: 'login@example.com', password: 'wrong!!' } } as unknown as Request;
    const res = mockRes();
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('returns 200 and sets cookie on success', async () => {
    const req = { body: { email: 'login@example.com', password: 'secret1' } } as unknown as Request;
    const res = mockRes();
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.cookie).toHaveBeenCalledWith(
      'token',
      expect.any(String),
      expect.objectContaining({ httpOnly: true })
    );
  });
});

describe('UNIT-AUTH-CTRL: getProfile / logoutUser', () => {
  it('returns 401 when no token', async () => {
    const req = { cookies: {} } as unknown as Request;
    const res = mockRes();
    await getProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('returns 401 for invalid token', async () => {
    const req = { cookies: { token: 'bad.token' } } as unknown as Request;
    const res = mockRes();
    await getProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('returns user for valid token', async () => {
    const user = await UserModel.create({
      name: 'Prof',
      email: 'prof@example.com',
      password: await hashPassword('abcdef'),
    });
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    const req = { cookies: { token } } as unknown as Request;
    const res = mockRes();
    await getProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('clears token cookie on logout', () => {
    const req = {} as unknown as Request;
    const res = mockRes();
    logoutUser(req, res);
    expect(res.cookie).toHaveBeenCalledWith(
      'token',
      '',
      expect.objectContaining({
        httpOnly: true,
        expires: expect.any(Date),
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
