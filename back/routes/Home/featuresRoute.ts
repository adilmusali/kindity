import express, { Router, Request, Response } from 'express';
import { FeaturesModel } from '../../models/Home/featuresModel';

const router: Router = express.Router();

const get = async (req: Request,res: Response): Promise<void> => {
    const features = await FeaturesModel.find({});
    res.send(features);
}

const post = async (req: Request,res: Response): Promise<void> => {
    const uploadData = req.body;
    const features = new FeaturesModel(uploadData);
    await features.save();
    res.send(features);
}

const del = async (req: Request,res: Response): Promise<void> => {
    const findId = req.params.id;
    await FeaturesModel.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

const put = async (req: Request, res: Response) => {
    const Id = req.params.id;
    const updated = req.body;
    const result = await FeaturesModel.findByIdAndUpdate(Id, updated, {
      new: true,
    });
    res.send(result);
};

router.get("/", get)
router.post("/", post)
router.delete("/:id", del)
router.put("/:id", put)

export default router;