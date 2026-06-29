// cookie how to set 
// bcrypt encryptoin and descrytion/compare.
// jwt authentication

const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(cookieParser());


app.get("/",(req ,res)=>{
    // res.cookie("name" ,"aditya");
    // res.send("hey");
    // bcrypt.genSalt(10 , (err , salt)=>{
    //     bcrypt.hash("password",salt,(err,hash)=>{
    //         console.log(hash);
    //     })
    // }) 
    // bcrypt.compare("password" ,"$2b$10$pR6AZ6zHZfHajQ0dfz2s2ujHtd2hRru76YezG8rVnPvE/zVagGoM6", (err ,result)=>{
    //     console.log(result);
    // });
    // res.send("working");
});

app.get("/read", (req ,res)=>{
    res.send("meow");
})



app.get("/read" ,(req,res)=>{
    res.send("working");
    console.log(req.cookies);
})

app.listen("3000");