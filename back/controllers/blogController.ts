import { RequestHandler } from 'express';
import News from '../models/Blog/newsModel';
import Options from '../models/Blog/optionsModel';

export const getBlogContent: RequestHandler = async (req, res) => {
  try {
    const [news, options] = await Promise.all([
      News.find({}),
      Options.find({})
    ]);

    res.status(200).json({ news, options });
  } catch (error) {
    console.error("Error fetching blog page content:", error);
    res.status(500).json({ error: 'Failed to load blog page content.' });
  }
};