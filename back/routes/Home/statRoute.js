const express = require("express");
const router = express.Router();
const Stat = require("../../models/Home/statModel");

const get = async (req, res) => {
  const stat = await Stat.find({});
  res.send(stat);
};

const post = async (req, res) => {
  const uploadData = req.body;
  const stat = new Stat(uploadData);
  stat.save();
  res.send(stat);
};

const del = async (req, res) => {
  const findId = req.params.id;
  await Stat.findByIdAndDelete(findId);
  res.send({ message: "Successfully Deleted!" });
};

const put = async (req, res) => {
  const Id = req.params.id;
  const updated = req.body;
  const result = await Stat.findByIdAndUpdate(Id, updated, {
    new: true,
  });
  res.send(result);
};

router.get("/", get);
router.post("/", post);
router.delete("/:id", del);
router.put("/:id", put);

module.exports = router;
