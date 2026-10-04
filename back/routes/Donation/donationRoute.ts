import express, { Request, Response } from "express";
import Donation from "../../models/Donation/donationModel";
import { protect, isAdmin } from "../../middleware/authMiddleware";

const router = express.Router();

const get = async (_req: Request, res: Response) => {
    const donation = await Donation.find({});
    res.send(donation);
}

const post = async (req: Request, res: Response) => {
    try {
        const donation = new Donation({ header: req.body?.header, desc: req.body?.desc });
        await donation.save();
        res.send(donation);
    } catch (error) {
        if (error instanceof Error && error.name === 'ValidationError') {
            res.status(400).json({ error: 'Invalid donation content.' });
            return;
        }
        res.status(500).json({ error: 'Unable to save donation content.' });
    }
}

const del = async (req: Request, res: Response) => {
    const findId = req.params.id;
    await Donation.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

const put = async (req: Request, res: Response) => {
    const Id = req.params.id;
    const updated = req.body;
    const result = await Donation.findByIdAndUpdate(Id, updated, {
      new: true,
    });
    res.send(result);
  };

router.get("/", get)
router.post("/", protect, isAdmin, post)
router.delete("/:id", protect, isAdmin, del)
router.put("/:id", protect, isAdmin, put)

export default router;
