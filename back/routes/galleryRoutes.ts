import express from 'express';
import { getGalleryImages } from '../controllers/galleryController';

const router = express.Router();

router.get('/', getGalleryImages);

export default router;