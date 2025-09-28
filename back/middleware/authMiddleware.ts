import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import UserModel from '../models/userModel';

export const protect: RequestHandler = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    try {
      token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      
      req.user = await UserModel.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401).json({ error: 'Not authorized, user not found' });
        return;
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Not authorized, token failed' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
    return;
  }
};

export const isAdmin: RequestHandler = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as an admin' });
  }
};