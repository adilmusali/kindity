const express = require("express")
const router = express.Router()
const Logo = require("../../models/Home/logoModel")

const get = async (req,res) => {
    const logo = await Logo.find({});
    res.send(logo);
}

const post = async (req,res) => {
    const uploadData = req.body;
    const logo = new Logo(uploadData);
    logo.save();
    res.send(logo);
}

const del = async (req,res) => {
    const findId = req.params.id;
    await Logo.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

router.get("/", get)
router.post("/", post)
router.delete("/:id", del)

module.exports = router