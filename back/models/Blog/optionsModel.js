const mongoose = require("mongoose");

const optionsSchema = mongoose.Schema({
    header:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("options", optionsSchema)