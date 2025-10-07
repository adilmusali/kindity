import express from 'express';
import { getBlogContent } from '../controllers/blogController';

const router = express.Router();

router.get('/', getBlogContent);

export default router;