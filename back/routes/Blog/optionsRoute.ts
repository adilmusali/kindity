import express, { Request, Response } from "express";
const router = express.Router();
import Options from "../../models/Blog/optionsModel";

const get = async (_req: Request, res: Response) => {
    const options = await Options.find({});
    res.send(options);
}

const getById = async (req: Request, res: Response) => {
  const findId = req.params.id;
  const options = await Options.findById(findId);
  res.send(options);
}

const post = async (req: Request, res: Response) => {
    const uploadData = req.body;
    const options = new Options(uploadData);
    options.save();
    res.send(options);
}

const del = async (req: Request, res: Response) => {
    const findId = req.params.id;
    await Options.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

const put = async (req: Request, res: Response) => {
    const Id = req.params.id;
    const updated = req.body;
    const result = await Options.findByIdAndUpdate(Id, updated, {
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