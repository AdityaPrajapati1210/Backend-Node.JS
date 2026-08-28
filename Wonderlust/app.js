const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const method = require("method-override");
const ejsMate = require("ejs-mate");
const app = express();



app.engine("ejs", ejsMate);
app.set("view engine" ,"ejs");  
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));
app.use(method("_method"));

app.get("/",(req,res)=>{
    res.redirect("/home");
});

app.get("/home",(req,res)=>{
    res.render("listing/home");
})
app.get("/alllisting", async (req,res)=>{
    const data = await listing.find();
    res.render("listing/alllisting" ,{data: data});
})


app.get("/listing",(req,res)=>{
    res.render("listing/addlisting");
})
app.post("/listing", async (req,res)=>{              //add to listing
    const {title ,description ,image_url,price,location,country} = req.body;
    await listing.create({
        title,
        description,
        image_url,
        price,
        location,
        country
    })
    res.redirect("/home");
})

app.get("/listing/:id",async (req,res)=>{                //details edit page
    const data = await listing.findById(req.params.id);
    res.render("listing/listingDetails", {data : data});
})

app.get("/listing/:id/edit", async (req,res)=>{                 //edit page khol k dega
    const data = await listing.findById(req.params.id);
    res.render("listing/edit",{data : data});
})

app.patch("/listing/:id",async (req,res)=>{
    await listing.findByIdAndUpdate(req.params.id,req.body);
    res.redirect(`/listing/${req.params.id}`);
})

app.delete("/listing/:id",async (req,res)=>{
    await listing.findByIdAndDelete(req.params.id);
    res.redirect("/alllisting");
})

app.listen(8080,()=>{
    console.log("App run on port 8080");
})