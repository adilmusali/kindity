import express, { Router, Request, Response } from 'express';
import { WelcomeModel } from '../../models/Home/welcomeModel';

const router: Router = express.Router();

const get = async (req: Request, res: Response): Promise<void> => {
    const welcome = await WelcomeModel.find({});
    res.send(welcome);
};

const post = async (req: Request, res: Response): Promise<void> => {
    const uploadData = req.body;
    const welcome = new WelcomeModel(uploadData);
    await welcome.save();
    res.send(welcome);
};

const del = async (req: Request, res: Response): Promise<void> => {
    const findId = req.params.id;
    await WelcomeModel.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
};

router.get("/", get);
router.post("/", post);
router.delete("/:id", del);

export default router;