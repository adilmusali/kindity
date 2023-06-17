const mongoose = require("mongoose");

const welcomeSchema = mongoose.Schema({
    header:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    donation:{
        type: Number,
        required: true
    },
    projects:{
        type: Number,
        required: true
    },
    volunteers:{
        type: Number,
        required: true
    },
    img:{
        type: String,
        required: true
    },
},{timestamps: true})

module.exports = mongoose.model("welcome", welcomeSchema)