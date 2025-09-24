import express, { Request, Response } from "express";
import Contact from "../../models/Contact/contactModel";

const router = express.Router();

const get = async (_req: Request, res: Response) => {
    const contact = await Contact.find({});
    res.send(contact);
}

const post = async (req: Request, res: Response) => {
    const uploadData = req.body;
    const contact = new Contact(uploadData);
    contact.save();
    res.send(contact);
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
router.post("/", post)
router.delete("/:id", del)
router.put("/:id", put)

export default router;