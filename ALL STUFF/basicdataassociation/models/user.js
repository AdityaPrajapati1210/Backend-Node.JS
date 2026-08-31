const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testdataassociation");

const userSchema = mongoose.Schema({
    username : String,
    email: String,
    age: Number,
    post: []
});

module.exports = mongoose.model("user",userSchema);