const express = require("express")
const router = express.Router()
const Features = require("../../models/Home/featuresModel")

const get = async (req,res) => {
    const features = await Features.find({});
    res.send(features);
}

const post = async (req,res) => {
    const uploadData = req.body;
    const features = new Features(uploadData);
    features.save();
    res.send(features);
}

const del = async (req,res) => {
    const findId = req.params.id;
    await Features.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

const put = async (req, res) => {
    const Id = req.params.id;
    const updated = req.body;
    const result = await Features.findByIdAndUpdate(Id, updated, {
      new: true,
    });
    res.send(result);
  };

router.get("/", get)
router.post("/", post)
router.delete("/:id", del)
router.put("/:id", put)

module.exports = router