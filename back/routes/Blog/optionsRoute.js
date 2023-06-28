const express = require("express")
const router = express.Router()
const Options = require("../../models/Blog/optionsModel")

const get = async (req,res) => {
    const options = await Options.find({});
    res.send(options);
}

const getById = async (req,res) => {
  const findId = req.params.id;
  const options = await Options.findById(findId);
  res.send(options);
}

const post = async (req,res) => {
    const uploadData = req.body;
    const options = new Options(uploadData);
    options.save();
    res.send(options);
}

const del = async (req,res) => {
    const findId = req.params.id;
    await Options.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

const put = async (req, res) => {
    const Id = req.params.id;
    const updated = req.body;
    const result = await Options.findByIdAndUpdate(Id, updated, {
      new: true,
    });
    res.send(result);
  };

router.get("/", get)
router.post("/", post)
router.delete("/:id", del)
router.put("/:id", put)
router.get("/:id", getById)

module.exports = router