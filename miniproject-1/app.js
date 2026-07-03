const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const userModel = require("./models/user.js") ;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.render("index");
})


app.post("/register",  async (req,res)=>{
    let {name , username, email, age, password} = req.body;

    const user = await userModel.findOne({email});
    if(user) return res.send("user already present");

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password ,salt, async (err , hash)=>{
            const createduser = await userModel.create({
                name,
                username,
                email,
                password:hash,
                age,
            })

            const token  = jwt.sign({email},"secret");
            res.cookie("token",token);
            res.render("login");
        })
    })


})


app.get("/login",(req,res)=>{
    res.render("login");
})


app.post("/login" , async (req,res)=>{
    const user = await userModel.findOne({email:req.body.email});
    if(!user) return res.send("something went wrong!!");

    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(result){
            const token  = jwt.sign({email :user.email},"secret");
            res.cookie("token",token);
            return res.send("Successfully login!");
        }else{
            res.send("something went wrong!!");
        }
    })
})


app.get("/profile",isloggedin,(req,res)=>{
    res.send("This is my profile, I am logged in");
})


function isloggedin(req,res,next){
    if(!req.cookies.token){
        res.send("You must login first");
    }
     try {
        const data = jwt.verify(req.cookies.token, "secret");

        req.user = data;

        next();

    } catch (err) {
        return res.render("Invalid token");
    }
}

app.get("/logout",(req,res)=>{
    res.cookie("token" , "");
    res.send("you are logged out!!");
})
app.listen(3000);   