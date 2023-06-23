const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    header:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("contact", contactSchema)