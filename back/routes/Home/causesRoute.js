const express = require("express")
const router = express.Router()
const Causes = require("../../models/Home/causesModel")

const get = async (req,res) => {
    const causes = await Causes.find({});
    res.send(causes);
}

const post = async (req,res) => {
    const uploadData = req.body;
    const causes = new Causes(uploadData);
    causes.save();
    res.send(causes);
}

const del = async (req,res) => {
    const findId = req.params.id;
    await Causes.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

const put = async (req, res) => {
    const Id = req.params.id;
    const updated = req.body;
    const result = await Causes.findByIdAndUpdate(Id, updated, {
      new: true,
    });
    res.send(result);
  };

router.get("/", get)
router.post("/", post)
router.delete("/:id", del)
router.put("/:id", put)

module.exports = router