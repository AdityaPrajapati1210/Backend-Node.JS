const fs = require('node:fs');
const http = require('http');


function create(){
    fs.writeFile("hey.txt","Its very to understand the Node js",function(err){
        if(err) console.error(err);
        else console.log("done");
    });

}

function rename(){
    fs.rename("myFile.cpp","myFile.txt",function(err){
        if(err) console.error(err);
        else console.log("successfull");
    });

}

// rename();

// fs.readdir(".",function(err,files){
//     if(err) console.error(err);
//     else console.log(files);
// });


// const server = http.createServer(function(req,res){
//     res.end("Hello World");
// });

// server.listen(3000);

const express = require("express");
const app = express();

// app.get(route , errorhanfler);
app.get("/",function(req,res){
    res.send("this is the main app samjhe..baby.");
});
app.get("/profile",function(req,res){
    res.send("this is my profile");
});

app.listen(3000);