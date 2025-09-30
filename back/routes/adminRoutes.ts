import express from 'express';
import { getAllDonations } from '../controllers/adminController';
import { protect, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/donations').get(protect, isAdmin, getAllDonations);

export default router;