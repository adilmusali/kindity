import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/userModel';
import { hashPassword, comparePassword } from '../helpers/auth';

const createToken = (userId: string, email: string, role: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET is not defined!");
    throw new Error("JWT secret configuration error.");
  }
  return jwt.sign({ id: userId, email, role }, jwtSecret, {
    expiresIn: "1d"
  });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    if (!name) {
      res.status(400).json({ error: 'Name is required'});
      return;
    }
    if (!email) {
      res.status(400).json({ error: 'Email is required'});
      return;
    }
    if (!password || password.length < 6) {
      res.status(400).json({ error: "Password is required and must be at least 6 characters long"})
      return;
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists with this email' });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });
    await newUser.save();

    const token = createToken(newUser._id.toString(), newUser.email, newUser.role);

    const userResponse = { ... (newUser.toObject() as IUser) };
    delete userResponse.password;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
    })
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = await UserModel.findOne({ email }).select('+password');
    if (!user || !user.password) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = createToken(user._id.toString(), user.email, user.role);

    const userResponse = { ... (user.toObject() as IUser) };
    delete userResponse.password;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });
    
    res.status(200).json({
      message: "Login successfull",
      user: userResponse
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message})
  }
}

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: "No token provided, authorization denied" });
    return;
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined!");
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }

    const decoded = jwt.verify(token, jwtSecret) as {id: string; email: string, role: string}
    
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(401).json({ error: 'Token is not valid' });
  }
}

export const logoutUser = (req: Request, res: Response): void => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.status(200).json({ message: "Logout successfull" });
}
