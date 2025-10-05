import express from 'express';
import { getHomeContent } from '../../controllers/homeContentController';

const router = express.Router();

router.get('/', getHomeContent);

export default router;