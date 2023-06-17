const express = require("express")
const router = express.Router()
const Events = require("../../models/Home/eventsModel")

const get = async (req,res) => {
    const events = await Events.find({});
    res.send(events);
}

const post = async (req,res) => {
    const uploadData = req.body;
    const events = new Events(uploadData);
    events.save();
    res.send(events);
}

const del = async (req,res) => {
    const findId = req.params.id;
    await Events.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

router.get("/", get)
router.post("/", post)
router.delete("/:id", del)

module.exports = router