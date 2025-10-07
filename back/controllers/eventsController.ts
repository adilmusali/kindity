import { RequestHandler } from 'express';
import { EventsModel } from '../models/Home/eventsModel';

// Fetches all events
export const getAllEvents: RequestHandler = async (req, res) => {
  try {
    const events = await EventsModel.find({});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// Fetches a single event by its ID
export const getEventById: RequestHandler = async (req, res) => {
  try {
    const event = await EventsModel.findById(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event' });
  }
};