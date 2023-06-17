const mongoose = require("mongoose");

const eventsSchema = mongoose.Schema({
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
    }
},{timestamps: true})

module.exports = mongoose.model("events", eventsSchema)