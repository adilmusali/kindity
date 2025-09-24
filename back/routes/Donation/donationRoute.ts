import express, { Request, Response } from "express";
import Donation from "../../models/Donation/donationModel";

const router = express.Router();

const get = async (_req: Request, res: Response) => {
    const donation = await Donation.find({});
    res.send(donation);
}

const post = async (req: Request, res: Response) => {
    const uploadData = req.body;
    const donation = new Donation(uploadData);
    donation.save();
    res.send(donation);
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
router.post("/", post)
router.delete("/:id", del)
router.put("/:id", put)

export default router;