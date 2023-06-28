const express = require("express")
const router = express.Router()
const News = require("../../models/Blog/newsModel")

const get = async (req,res) => {
    const news = await News.find({});
    res.send(news);
}

const getById = async (req,res) => {
  const findId = req.params.id;
  const news = await News.findById(findId);
  res.send(news);
}

const post = async (req,res) => {
    const uploadData = req.body;
    const news = new News(uploadData);
    news.save();
    res.send(news);
}

const del = async (req,res) => {
    const findId = req.params.id;
    await News.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

const put = async (req, res) => {
    const Id = req.params.id;
    const updated = req.body;
    const result = await News.findByIdAndUpdate(Id, updated, {
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