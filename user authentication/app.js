const express = require("express");
const app  = express();

const path = require("path");
const userModel = require("./models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cookie = require("cookie-parser");

app.use(cookieParser());
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/" ,(req,res)=>{
    res.render("index");
});

app.post("/create", async (req,res)=>{
    let {username ,email, password, age} = req.body;

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){

            const createduser = await userModel.create({
                username,
                email,
                password: hash,
                age
            });

            const token = jwt.sign({email},"meow");
            res.cookie("token", token);

            res.send(createduser);
        });
    });
});


app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login", async (req,res)=>{
    let user = await userModel.findOne({email:req.body.email});
    if(!user) return res.send("email or password is incorrect!");

    bcrypt.compare(req.body.password ,user.password,function(err, result){
        console.log(result);
        if(result){
            const token = jwt.sign({email: user.email},"meow");
            res.cookie("token", token);
            res.send("Successfully login!");
        }else{
            res.send("email or password is incorrect!");
        }
    });
})

app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
})

app.listen(3000);