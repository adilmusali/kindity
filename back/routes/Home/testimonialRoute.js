const express = require("express")
const router = express.Router()
const Test = require("../../models/Home/testimonialModel")

const get = async (req,res) => {
    const test = await Test.find({});
    res.send(test);
}

const post = async (req,res) => {
    const uploadData = req.body;
    const test = new Test(uploadData);
    test.save();
    res.send(test);
}

const del = async (req,res) => {
    const findId = req.params.id;
    await Test.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

router.get("/", get)
router.post("/", post)
router.delete("/:id", del)

module.exports = router