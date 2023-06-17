const mongoose = require("mongoose");

const logoSchema = mongoose.Schema({
    img:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("logo", logoSchema)