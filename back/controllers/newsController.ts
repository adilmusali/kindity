import { RequestHandler } from 'express';
import News from '../models/Blog/newsModel';

export const createNews: RequestHandler = async (req, res) => {
  try {
    const news = await News.create({
      header: req.body.header,
      desc: req.body.desc,
      img: req.body.img,
      category1: req.body.category1,
      category2: req.body.category2,
      category3: req.body.category3,
      category4: req.body.category4,
      user: req.body.user,
    });
    res.status(201).json(news);
  } catch (error) {
    if ((error as { name?: string }).name === 'ValidationError') {
      res.status(400).json({ message: 'Invalid news data' });
      return;
    }
    res.status(500).json({ message: 'Error creating news item' });
  }
};

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
