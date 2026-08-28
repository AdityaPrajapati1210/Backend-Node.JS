const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const method = require("method-override");
const ejsMate = require("ejs-mate");
const app = express();
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");


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

app.get("/alllisting", wrapAsync(async (req,res,next)=>{
    const data = await listing.find();
    res.render("listing/alllisting" ,{data: data});
}))

app.get("/listing",(req,res)=>{
    res.render("listing/addlisting");
})
app.post("/listing", wrapAsync(async (req,res,next)=>{              //add to listing
    if(!req.body){
        throw new ExpressError(501,"Data not found");
    }
    const {title ,description ,price,location,country} = req.body;
    let {image_url}  =req.body;
    if(!image_url){
        image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSltdyesaETmIsYYdxPW3gcpIW0LCkUWaTdcCzKII5VMw&s=10";
    }
    await listing.create({
        title,
        description,
        image_url,
        price,
        location,
        country
    })
    res.redirect("/home");
}))

app.get("/listing/:id",wrapAsync(async (req,res,next)=>{                //details edit page
    const data = await listing.findById(req.params.id);
    res.render("listing/listingDetails", {data : data});
}))

app.get("/listing/:id/edit", wrapAsync(async (req,res,next)=>{                 //edit page khol k dega
    const data = await listing.findById(req.params.id);
    res.render("listing/edit",{data : data});
}))

app.patch("/listing/:id",wrapAsync(async (req,res,next)=>{
    await listing.findByIdAndUpdate(req.params.id,req.body);
    res.redirect(`/listing/${req.params.id}`);
}))

app.delete("/listing/:id",wrapAsync(async (req,res,next)=>{
    await listing.findByIdAndDelete(req.params.id);
    res.redirect("/alllisting");
}))

app.all("/{*splat}",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
})

app.use((err, req, res, next) => {                               //err handling middleware
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("Error",{status:statusCode,message});
});

app.listen(8080,()=>{
    console.log("App run on port 8080");
})