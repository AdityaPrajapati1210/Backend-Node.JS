const express = require("express");
const app = express();

// app.use((req,res)=>{
//     console.log("request accept");
// })

app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.send("perfect");
    // res.render("index");
})



app.listen(3000, ()=>{
    console.log("server live on post 3000");
})