const express = require("express");
const app = express();

const usermodel = require("./userdatabase");


app.get("/create",async (req,res)=>{
    const Createduser = await usermodel.create({
        name:"Aditya",
        email:"aditya@123",
        username :"jaduger"
    })
    res.send(Createduser);
})


app.get("read",async (req ,res)=>{
    const restuser = await usermodel.find({username : "jaduger"});
    res.send(restuser);
})

app.get("/",(req,res)=>{
    res.send("hey");
})

app.listen(3000);