import express, { Request, Response } from "express";
import { Testimonial } from "../../models/Home/testimonialModel";
import { protect, isAdmin } from "../../middleware/authMiddleware";

const router = express.Router();

const get = async (_req: Request, res: Response) => {
    const test = await Testimonial.find({});
    res.send(test);
};

const post = async (req: Request, res: Response) => {
    const uploadData = req.body;
    const test = new Testimonial(uploadData);
    await test.save();
    res.send(test);
};

const del = async (req: Request, res: Response) => {
    const findId = req.params.id;
    await Testimonial.findByIdAndDelete(findId);
    res.send({ message: "Successfully Deleted!" });
};

router.get("/", get);
router.post("/", protect, isAdmin, post);
router.delete("/:id", protect, isAdmin, del);

export default router;