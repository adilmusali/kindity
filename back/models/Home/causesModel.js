const mongoose = require("mongoose");

const causesSchema = mongoose.Schema({
    img:{
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
    },
    raised:{
        type: Number,
        required: true
    },
    need:{
        type: Number,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("causes", causesSchema)