import { RequestHandler } from 'express';
import News from '../models/Blog/newsModel';

export const getNewsById: RequestHandler = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (newsItem) {
      res.status(200).json(newsItem);
    } else {
      res.status(404).json({ message: 'News item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news item' });
  }
};