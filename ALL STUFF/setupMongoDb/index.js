const express = require("express");
const app = express();

const user = require("./userdatabase");


app.get("/create",async (req,res)=>{
    const Createduser = await user.create({
        name:"Aditya",
        email:"aditya@123",
        username :"jaduger"
    })
    console.log("ccreated");
    res.send(Createduser);
})


app.get("read",async (req ,res)=>{
    const restuser = await user.find({username : "jaduger"});
    res.send(restuser);
})

app.get("/",(req,res)=>{
    res.send("hey");
})

app.listen(3000);