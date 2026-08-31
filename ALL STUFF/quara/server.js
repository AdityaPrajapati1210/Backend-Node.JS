const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

const posts = [
    {
        username: "aditya",
        caption: "caption",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwrqRKl-J9VJc1TxRcDQv-9r-ptFi8i_tIA7L1udrIdg&s"
    },
    {
        username: "aditya",
        caption: "caption",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwrqRKl-J9VJc1TxRcDQv-9r-ptFi8i_tIA7L1udrIdg&s"
    },

];

app.get("/",(req,res)=>{
    res.send("server workingg");
})

app.get("/posts",(req,res)=>{
    res.render("posts",{posts});
})


app.listen(5000,()=>{
    console.log("app listning on port 5000");
})