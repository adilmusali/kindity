const express = require("express")
const router = express.Router()
const Donation = require("../../models/Donation/donationModel")

const get = async (req,res) => {
    const donation = await Donation.find({});
    res.send(donation);
}

const post = async (req,res) => {
    const uploadData = req.body;
    const donation = new Donation(uploadData);
    donation.save();
    res.send(donation);
}

const del = async (req,res) => {
    const findId = req.params.id;
    await Donation.findByIdAndDelete(findId);
    res.send({message: "Successfully Deleted!"});
}

const put = async (req, res) => {
    const Id = req.params.id;
    const updated = req.body;
    const result = await Donation.findByIdAndUpdate(Id, updated, {
      new: true,
    });
    res.send(result);
  };

router.get("/", get)
router.post("/", post)
router.delete("/:id", del)
router.put("/:id", put)

module.exports = router