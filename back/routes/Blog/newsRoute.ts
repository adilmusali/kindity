import express, { Request, Response } from "express";
import News from "../../models/Blog/newsModel"

const router = express.Router();

const get = async (req: Request, res: Response) => {
  const news = await News.find({});
  res.send(news);
};

const getById = async (req: Request, res: Response) => {
  const findId = req.params.id;
  const news = await News.findById(findId);
  res.send(news);
};

const post = async (req: Request, res: Response) => {
  const uploadData = req.body;
  const news = new News(uploadData);
  await news.save();
  res.send(news);
};

const del = async (req: Request, res: Response) => {
  const findId = req.params.id;
  await News.findByIdAndDelete(findId);
  res.send({ message: "Successfully Deleted!" });
};

const put = async (req: Request, res: Response) => {
  const Id = req.params.id;
  const updated = req.body;
  const result = await News.findByIdAndUpdate(Id, updated, {
    new: true,
  });
  res.send(result);
};

router.get("/", get);
router.post("/", post);
router.delete("/:id", del);
router.put("/:id", put);
router.get("/:id", getById);

export default router;