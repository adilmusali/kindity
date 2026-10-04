import express from 'express';
import { createNews, getNewsById } from '../controllers/newsController';
import { protect, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, isAdmin, createNews);
router.get('/:id', getNewsById);

export default router;
