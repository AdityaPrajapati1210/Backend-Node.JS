const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.get("/",function(req,res){
    fs.readdir("./files",function(err,files){
        res.render("index" , {files : files});
    });
});


app.post("/create",(req , res)=>{
    if(req.body.title.length > 0){
        fs.writeFile(`./files/${req.body.title.split(' ').  join('')}.txt` ,req.body.details,function(err){
            res.redirect("/");
        });
    }else{
        res.redirect("/");
    }
})

app.get("/files/:txt", (req, res) => {
    fs.readFile(`./files/${req.params.txt}`, "utf-8", (err, data) => {

        if(err){
            return res.send("File not found");
        }

        res.render("show", {
            filename: req.params.txt,
            content: data
        });
    });
});

app.post("/delete/:filename",(req ,res)=>{
    fs.unlink(`./files/${req.params.filename}`,(err)=>{
        if(err){
            return res.send("Something wrong");
        }

        res.redirect("/");
    })
})

app.get("/editFilename/:filename",(req ,res)=>{
    res.render("edit", {filename : req.params.filename});
})

app.post("/edit", (req, res) => {

    fs.rename(
        `./files/${req.body.oldname}`,
        `./files/${req.body.newname}.txt`,
        (err) => {

            if(err){
                return res.send("Rename failed");
            }

            res.redirect("/");
        }
    );

});

app.post("/updateContent", (req, res) => {

    fs.writeFile(
        `./files/${req.body.filename}`,
        req.body.content,
        (err) => {

            if(err){
                return res.send("Update failed");
            }

            res.redirect(`/`);
        }
    );

});
app.listen(3000,function(){
    console.log("its running");
});