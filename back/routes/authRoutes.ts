import express from 'express';
import { registerUser, loginUser, getProfile, logoutUser } from '../controllers/authControllers';
import { createLoginRateLimiter } from '../middleware/loginRateLimit';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', createLoginRateLimiter(), loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);

export default router;
