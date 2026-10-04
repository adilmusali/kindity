import express, { Request, Response } from "express";
import Contact from "../../models/Contact/contactModel";
import { protect, isAdmin } from "../../middleware/authMiddleware";

const router = express.Router();

const get = async (_req: Request, res: Response) => {
    const contact = await Contact.find({});
    res.send(contact);
}

const post = async (req: Request, res: Response) => {
    try {
        const contact = new Contact({ header: req.body?.header, desc: req.body?.desc });
        await contact.save();
        res.send(contact);
    } catch (error) {
        if (error instanceof Error && error.name === 'ValidationError') {
            res.status(400).json({ error: 'Invalid contact content.' });
            return;
        }
        res.status(500).json({ error: 'Unable to save contact content.' });
    }
}

const del = async (req: Request, res: Response) => {
    const findId = req.params.id;
    await Contact.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

const put = async (req: Request, res: Response) => {
    const Id = req.params.id;
    const updated = req.body;
    const result = await Contact.findByIdAndUpdate(Id, updated, {
      new: true,
    });
    res.send(result);
  };

router.get("/", get)
router.post("/", protect, isAdmin, post)
router.delete("/:id", protect, isAdmin, del)
router.put("/:id", protect, isAdmin, put)

export default router;
