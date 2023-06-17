const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
    img:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    job:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("testimonial", testSchema)