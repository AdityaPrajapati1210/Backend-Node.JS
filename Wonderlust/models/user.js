const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    listings:[
        {
            type :  mongoose.Schema.Types.ObjectId,
            ref : "listing"
        }
    ]
});


module.exports = mongoose.model("user", userSchema);