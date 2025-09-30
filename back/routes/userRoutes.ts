import express from "express";
import { getDonationHistory, updateUserProfile } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route('/donations').get(protect, getDonationHistory);
router.route('/profile').put(protect, updateUserProfile);

export default router;