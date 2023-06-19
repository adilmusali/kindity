const express = require("express")
const router = express.Router()
const Images = require("../../models/Gallery/imagesModel")

const get = async (req,res) => {
    const images = await Images.find({});
    res.send(images);
}

const post = async (req,res) => {
    const uploadData = req.body;
    const images = new Images(uploadData);
    images.save();
    res.send(images);
}

const del = async (req,res) => {
    const findId = req.params.id;
    await Images.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

const put = async (req, res) => {
    const Id = req.params.id;
    const updated = req.body;
    const result = await Images.findByIdAndUpdate(Id, updated, {
      new: true,
    });
    res.send(result);
  };

router.get("/", get)
router.post("/", post)
router.delete("/:id", del)
router.put("/:id", put)

module.exports = router