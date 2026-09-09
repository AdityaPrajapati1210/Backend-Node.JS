const express = require("express");
const router = express.Router();
const User = require('../models/user');


router.get('/signup',(req,res)=>{
    res.render("users/signupForm");
})


router.post('/signup', async (req,res)=>{
    const { username , email, password} =  req.body;

    const user = new User({
        username,
        email
    })

    let registerUser = await User.register(user,password);
    console.log(registerUser);
    req.flash("success","user register successfully");
    res.redirect('/home');
})
module.exports = router;