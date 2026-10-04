import { RequestHandler } from 'express';
import DonationHistoryModel from '../models/donationHistoryModel';
import UserModel from '../models/userModel';

// Get Donation History
export const getDonationHistory: RequestHandler = async (req, res) => {
    try {
        const donations = await DonationHistoryModel.find({ user: req.user?._id }).sort({ createdAt: -1 });
        res.json(donations);
    } catch (error) {
        console.error('Donation history error:', error);
        res.status(500).json({ error: 'Unable to load donation history.' });
    }
}

// Update User Profile
export const updateUserProfile: RequestHandler = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user?._id);

        if (!user) {
            res.status(400).json({ error: 'User not found.' });
            return;
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } catch (error) {
        const dbError = error as { code?: number; name?: string };
        if (dbError?.code === 11000) {
            res.status(409).json({ error: 'Email is already in use.' });
            return;
        }
        if (dbError?.name === 'ValidationError') {
            res.status(400).json({ error: 'Invalid profile data.' });
            return;
        }
        console.error('Profile update error:', error);
        res.status(500).json({ error: 'Unable to update profile.' });
    }
}
