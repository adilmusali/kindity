const mongoose = require("mongoose");

const statSchema = mongoose.Schema({
    header:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("statistics", statSchema)