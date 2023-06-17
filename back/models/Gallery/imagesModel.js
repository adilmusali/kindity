const mongoose = require("mongoose");

const imagesSchema = mongoose.Schema({
    img:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("gallery", imagesSchema)