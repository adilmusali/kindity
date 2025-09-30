import { RequestHandler } from 'express';
import DonationHistoryModel from '../models/donationHistoryModel';

export const getAllDonations: RequestHandler = async (req, res) => {
  try {
    const donations = await DonationHistoryModel.find({})
      .sort({ createdAt: -1 }) 
      .populate('user', 'name email');

    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching all donations.' });
  }
};