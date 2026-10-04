import express from 'express';
import { createEvent, getAllEvents, getEventById } from '../controllers/eventsController';
import { protect, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', protect, isAdmin, createEvent);
router.get('/:id', getEventById);

export default router;
