import express from 'express';
import { getNewsById } from '../controllers/newsController';

const router = express.Router();

router.get('/:id', getNewsById);

export default router;