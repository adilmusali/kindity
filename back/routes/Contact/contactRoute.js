const express = require("express")
const router = express.Router()
const Contact = require("../../models/Contact/contactModel")

const get = async (req,res) => {
    const contact = await Contact.find({});
    res.send(contact);
}

const post = async (req,res) => {
    const uploadData = req.body;
    const contact = new Contact(uploadData);
    contact.save();
    res.send(contact);
}

const del = async (req,res) => {
    const findId = req.params.id;
    await Contact.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

const put = async (req, res) => {
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

module.exports = router