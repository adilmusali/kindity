import express, { Router, Request, Response } from 'express';
import { CausesModel } from '../../models/Home/causesModel';

const router: Router = express.Router();

const get = async (req: Request, res: Response): Promise<void> => {
    const causes = await CausesModel.find({});
    res.send(causes);
};

const post = async (req: Request, res: Response): Promise<void> => {
    const uploadData = req.body;
    const causes = new CausesModel(uploadData);
    await causes.save();
    res.send(causes);
};

const del = async (req: Request, res: Response): Promise<void> => {
    const findId = req.params.id;
    await CausesModel.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
};

const put = async (req: Request, res: Response): Promise<void> => {
    const Id = req.params.id;
    const updated = req.body;
    const result = await CausesModel.findByIdAndUpdate(Id, updated, {
        new: true,
    });
    res.send(result);
};

router.get("/", get);
router.post("/", post);
router.delete("/:id", del);
router.put("/:id", put);

export default router;