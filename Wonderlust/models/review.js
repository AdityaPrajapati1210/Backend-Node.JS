const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
        trim:true,
    },
    rating:{
        type:Number,
        min: [1, "Rating is too low"],
        max: [5, "Rating is too high"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model("Review", reviewSchema);