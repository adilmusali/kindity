import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { protect, isAdmin } from '../../middleware/authMiddleware';
import UserModel from '../../models/userModel';
import { hashPassword } from '../../helpers/auth';

const mockRes = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('UNIT-AUTH-MW: protect middleware', () => {
  it('returns 401 when no token cookie is present', async () => {
    const req = { cookies: {} } as unknown as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized, no token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 for a tampered JWT', async () => {
    const req = { cookies: { token: 'not.a.valid.jwt' } } as unknown as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized, token failed' });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 for an expired JWT', async () => {
    const token = jwt.sign(
      { id: '507f1f77bcf86cd799439011', email: 'a@b.com', role: 'user' },
      process.env.JWT_SECRET!,
      { expiresIn: -1 }
    );
    const req = { cookies: { token } } as unknown as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 when user in token no longer exists', async () => {
    const token = jwt.sign(
      { id: '507f1f77bcf86cd799439011', email: 'gone@example.com', role: 'user' },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    const req = { cookies: { token } } as unknown as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized, user not found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('sets req.user and calls next for a valid token', async () => {
    const user = await UserModel.create({
      name: 'Valid User',
      email: 'valid@example.com',
      password: await hashPassword('password1'),
      role: 'user',
    });
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    const req = { cookies: { token } } as unknown as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    await protect(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user!.email).toBe('valid@example.com');
  });
});

describe('UNIT-AUTH-MW: isAdmin middleware', () => {
  it('returns 403 when no user on request', () => {
    const req = {} as unknown as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    isAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 for a non-admin user', async () => {
    const user = await UserModel.create({
      name: 'Regular',
      email: 'user@example.com',
      password: await hashPassword('password1'),
      role: 'user',
    });
    const req = { user } as unknown as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    isAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next for an admin user', async () => {
    const user = await UserModel.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: await hashPassword('password1'),
      role: 'admin',
    });
    const req = { user } as unknown as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    isAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
