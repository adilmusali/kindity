import { RequestHandler } from 'express';
import Images from '../models/Gallery/imagesModel';

export const getGalleryImages: RequestHandler = async (req, res) => {
  try {
    const images = await Images.find({});
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery images' });
  }
};