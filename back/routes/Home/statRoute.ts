import express, { Router, Request, Response } from 'express';
import { StatModel } from '../../models/Home/statModel'; // Assuming you have a TypeScript model

const router: Router = express.Router();

const get = async (req: Request, res: Response) => {
  const stat = await StatModel.find({});
  res.send(stat);
};

const post = async (req: Request, res: Response) => {
  const uploadData = req.body;
  const stat = new StatModel(uploadData);
  await stat.save();
  res.send(stat);
};

const del = async (req: Request, res: Response) => {
  const findId = req.params.id;
  await StatModel.findByIdAndDelete(findId);
  res.send({ message: "Successfully Deleted!" });
};

const put = async (req: Request, res: Response) => {
  const Id = req.params.id;
  const updated = req.body;
  const result = await StatModel.findByIdAndUpdate(Id, updated, {
    new: true,
  });
  res.send(result);
};

router.get("/", get);
router.post("/", post);
router.delete("/:id", del);
router.put("/:id", put);

export default router;