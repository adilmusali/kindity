const express = require("express")
const router = express.Router()
const Welcome = require("../../models/Home/welcomeModel")

const get = async (req,res) => {
    const welcome = await Welcome.find({});
    res.send(welcome);
}

const post = async (req,res) => {
    const uploadData = req.body;
    const welcome = new Welcome(uploadData);
    welcome.save();
    res.send(welcome);
}

const del = async (req,res) => {
    const findId = req.params.id;
    await Welcome.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

router.get("/", get)
router.post("/", post)
router.delete("/:id", del)

module.exports = router