import express, { Request, Response } from "express";
import Images, { IImage } from "../../models/Gallery/imagesModel";

const router = express.Router();

const get = async (_: Request, res: Response) => {
  const images = await Images.find({});
  res.send(images);
};

const post = async (req: Request, res: Response) => {
  const uploadData = req.body as IImage;
  const images = new Images(uploadData);
  await images.save();
  res.send(images);
};

const del = async (req: Request, res: Response) => {
  const findId = req.params.id;
  await Images.findByIdAndDelete(findId);
  res.send({ message: "Successfully Deleted!" });
};

const put = async (req: Request, res: Response) => {
  const Id = req.params.id;
  const updated = req.body as Partial<IImage>;
  const result = await Images.findByIdAndUpdate(Id, updated, {
    new: true,
  });
  res.send(result);
};

router.get("/", get);
router.post("/", post);
router.delete("/:id", del);
router.put("/:id", put);

export default router;