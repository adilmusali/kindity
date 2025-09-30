import { RequestHandler } from 'express';
import DonationHistoryModel from '../models/donationHistoryModel';
import UserModel from '../models/userModel';

// Get Donation History
export const getDonationHistory: RequestHandler = async (req, res) => {
    const donations = await DonationHistoryModel.find({ user: req.user?._id }).sort({ createdAt: -1 })
    res.json(donations)
}

// Update User Profile
export const updateUserProfile: RequestHandler = async (req, res) => {
    const user = await UserModel.findById(req.user?._id)

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } else {
        res.status(400).json({ error: "User not found." })
    }
}