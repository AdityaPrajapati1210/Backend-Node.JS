const express = require("express");
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require("../utils/wrapAsync");
const passport = require('passport');
const {isLoggedin,saveRedirect } = require('../middleware/isLoggedin.js');


router.get('/signup', (req, res) => {
    res.render("users/signupForm");
})


router.post("/signup", wrapAsync(async (req, res, next) => {

    try {
        const { username, email, password } = req.body;

        const user = new User({
            username,
            email
        });

        const registerUser = await User.register(user, password);

        // Automatically login after successful signup
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "User registered successfully");
            return res.redirect("/home");
        });

    } catch (err) {

        // If username/email already exists, etc.
        req.flash("error", err.message);
        return res.redirect("/user/signup");
    }

}));


router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login',saveRedirect, passport.authenticate('local',
    { failureRedirect: "/user/login", failureFlash: true }),
    wrapAsync(async (req, res) => {
        req.flash("success", "Welcome to the Wonderlust");
        res.redirect(res.locals.redirectUrl);
    }))

router.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You logged out successfully");
        res.redirect('/home');
    })
})


module.exports = router;