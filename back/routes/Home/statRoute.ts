import express, { Router, Request, Response } from 'express';
import { StatModel } from '../../models/Home/statModel';
import { protect, isAdmin } from "../../middleware/authMiddleware";

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
router.post("/", protect, isAdmin, post);
router.delete("/:id", protect, isAdmin, del);
router.put("/:id", protect, isAdmin, put);

export default router;