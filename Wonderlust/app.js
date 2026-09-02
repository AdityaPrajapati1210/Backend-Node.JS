const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const method = require("method-override");
const ejsMate = require("ejs-mate");
const app = express();
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const Review = require('./models/review.js');
const { reviewSchema } = require('./schema.js');
const listingRouter = require('./routes/listingRouter.js')


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.use(method("_method"));
app.use("/listing",listingRouter);


const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details
            .map((el) => el.message)
            .join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.render("listing/home");
})

app.get("/alllisting", wrapAsync(async (req, res, next) => {
    const data = await listing.find();
    res.render("listing/alllisting", { data: data });
}))





app.all("/{*splat}", (req, res, next) => {
    console.log("Khali h");
    next(new ExpressError(404, "Page Not Found"));
})

app.use((err, req, res, next) => {                               //err handling middleware
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("Error", { status: statusCode, message });
});

app.listen(8080, () => {
    console.log("App run on port 8080");
})