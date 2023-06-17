const mongoose = require("mongoose");

const featuresSchema = mongoose.Schema({
    logo:{
        type: String,
        required: true
    },
    header:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("features", featuresSchema)