const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/myDatabase")
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    image:String
})

module.exports =  mongoose.model("user",userSchema);