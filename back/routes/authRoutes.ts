import express from 'express';
import { registerUser, loginUser, getProfile, logoutUser } from '../controllers/authControllers';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);

export default router;