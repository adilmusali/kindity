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

const put = async (req, res) => {
    const Id = req.params.id;
    const updated = req.body;
    const result = await Events.findByIdAndUpdate(Id, updated, {
      new: true,
    });
    res.send(result);
  };

router.get("/", get)
router.post("/", post)
router.delete("/:id", del)
router.put("/:id", put)

module.exports = router