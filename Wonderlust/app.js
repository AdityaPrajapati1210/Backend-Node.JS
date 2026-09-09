const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const method = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const Review = require('./models/review.js');
const { reviewSchema } = require('./schema.js');
const listingRouter = require('./routes/listingRouter.js')
const user = require("./models/user.js");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const passport = require('passport');
const passportLocals =  require('passport-local');
const User = require('./models/user.js');
const userRouter = require('./routes/userRouter.js');

app.use(cookieParser());


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.use(method("_method"));

app.get("/", (req, res) => {
    if (req.cookies.count) {
        
        let count = Number(req.cookies.count);
        count++;
        
        res.cookie("count", count);
        
    } else {
        res.cookie("count", 1);
    }
    res.redirect("/home");
});

app.use(session({
    secret: "mysecret", resave: false, saveUninitialized: true, cookie:
    {
        expires: Date.now() + 24 * 60 * 60 * 1000,
        maxAge:24 * 60 * 60 * 1000,
        httpOnly:true
    }
}))

app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocals(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{               //flash middleware
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    console.log(res.locals.success);
    console.log(res.locals.error)
    next();
})


app.get('/demouser',async (req,res)=>{
    const fakeUser = new User({
        email: "fake4@gmail.com",
        username : "fakeuser4"
    })

    let registeredUser = await User.register(fakeUser,"123456");

    console.log(registeredUser);
    res.send(registeredUser);
})

app.use("/listing", listingRouter);
app.use("/user",userRouter);


app.get("/home", (req, res) => {
    res.render("listing/home");
})

app.get("/allListing", wrapAsync(async (req, res, next) => {
    const data = await listing.find();
    res.render("listing/allListing", { data: data });
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