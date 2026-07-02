const express = require("express");
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/post");


app.get("/",(req,res)=>{
    res.send("hey");
})


app.get("/create", async (req,res)=>{
    const createduser = await userModel.create({
        username : "aditya kaise ho",
        email:"aditya@123",
        age:20,
    })

    res.send(createduser);
})


app.get("/post/create",async (req ,res)=>{
    const createdpost = await postModel.create({
        user: "6a465a10ab294fe425022ab9",
        postdata: "aditya aaj post kiya h nhi c"
    })

    const user = await userModel.findOne({_id: "6a465ae9633967a2b4760949"});
    user.post.push(createdpost._id);
    await user.save();

    res.send({createdpost,user});
})

app.listen(3000);