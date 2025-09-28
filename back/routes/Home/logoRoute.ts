import express, { Request, Response } from "express";
import Logo from "../../models/Home/logoModel";
import { protect, isAdmin } from "../../middleware/authMiddleware";

const router = express.Router();

const get = async (req: Request, res: Response) => {
  const logo = await Logo.find({});
  res.send(logo);
};

const post = async (req: Request, res: Response) => {
  const uploadData = req.body;
  const logo = new Logo(uploadData);
  await logo.save();
  res.send(logo);
};

const del = async (req: Request, res: Response) => {
  const findId = req.params.id;
  await Logo.findByIdAndDelete(findId);
  res.send({ message: "Successfully Deleted!" });
};

const put = async (req: Request, res: Response) => {
  const Id = req.params.id;
  const updated = req.body;
  const result = await Logo.findByIdAndUpdate(Id, updated, {
    new: true,
  });
  res.send(result);
};

router.get("/", get);
router.post("/", protect, isAdmin, post);
router.delete("/:id", protect, isAdmin, del);
router.put("/:id", protect, isAdmin, put);

export default router;