const mongoose = require("mongoose");

const donationSchema = mongoose.Schema({
    header:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("donation", donationSchema)