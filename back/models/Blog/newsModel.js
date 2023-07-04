const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
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
        required:true
    },
    category1:{
        type: String,
        required: true 
    },
    category2:{
        type: String,
        required: true
    },
    category3:{
        type: String,
        required: true
    },
    category4:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("news", newsSchema)