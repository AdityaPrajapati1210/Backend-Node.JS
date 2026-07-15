// cookie how to set
// // bcrypt encryptoin and descrytion/compare.
//  // jwt authentication


// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });

const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

app.use(cookieParser());


// Create Token and Store in Cookie
app.get("/", (req, res) => {
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash("password",salt,(err,hash)=>{
            console.log(hash);
            res.send("hash");
        })
    })

    const token = jwt.sign(
        { email: "aditya@123" },
        "privateKey"
    );

    res.cookie("token", token);

    res.send("Token Created Successfully");
});


// Read and Verify Token
app.get("/verify", (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.send("No Token Found");
    }

    try {
        const data = jwt.verify(
            token,
            "privateKey"
        );

        console.log(data);

        res.send(data);

    } catch (err) {
        console.log(err);
        res.send("Invalid Token");
    }
});


// Logout / Clear Cookie
app.get("/logout", (req, res) => {

    res.clearCookie("token");

    res.send("Logged Out");
});


app.listen(3000, () => {
    console.log("Server Running On Port 3000");
});