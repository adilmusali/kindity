import express, { Request, Response } from "express";
import { EventsModel } from "../../models/Home/eventsModel";
import { protect, isAdmin } from "../../middleware/authMiddleware";

const router = express.Router();

const get = async (req: Request, res: Response) => {
  const events = await EventsModel.find({});
  res.send(events);
};

const getById = async (req: Request, res: Response) => {
  const findId = req.params.id;
  const events = await EventsModel.findById(findId);
  res.send(events);
};

const post = async (req: Request, res: Response) => {
  const uploadData = req.body;
  const events = new EventsModel(uploadData);
  await events.save();
  res.send(events);
};

const del = async (req: Request, res: Response) => {
  const findId = req.params.id;
  await EventsModel.findByIdAndDelete(findId);
  res.send({ message: "Successfully Deleted!" });
};

const put = async (req: Request, res: Response) => {
  const Id = req.params.id;
  const updated = req.body;
  const result = await EventsModel.findByIdAndUpdate(Id, updated, {
    new: true,
  });
  res.send(result);
};

router.get("/", get);
router.post("/", protect, isAdmin, post);
router.delete("/:id", protect, isAdmin, del);
router.put("/:id", protect, isAdmin, put);
router.get("/:id", getById);

export default router;