require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const checkLogin = require("./middleware/auth");
const gallerySchema = require("./models/gallery");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("./config/cloudinary");
require("./config/db");

const Admin = require("./models/admin");

// ================= Middleware =================
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(checkLogin);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },

    filename: (req, file, cb) => {
        const random = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, random + "-" + file.originalname);
    }
});

const upload = multer({ storage });


// ================= Routes =================

// Home
app.get("/", (req, res) => {
    res.render("home");
});

// Contact
app.get("/contact", (req, res) => {
    res.render("contact");
});

// Login Page
app.get("/login", (req, res) => {
    res.render("login", { message: "" });
});

// Login
app.post("/login", async (req, res) => {

    const { name, password } = req.body;

    const admin = await Admin.findOne();

    if (!admin) {
        return res.render("login", {
            message: "Admin not found!"
        });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch || name !== admin.username) {
        return res.render("login", {
            message: "Invalid Credentials!"
        });
    }

    const token = jwt.sign({username: admin.username},process.env.JWT_SECRET);

    res.cookie("token", token);
    res.redirect("/admin");
});

// addimage 
app.post("/addimage", upload.single("image"), async (req, res) => {

    try {

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "gallery"
        });

        // Save in MongoDB
        await gallerySchema.create({
            image_url: result.secure_url,
            public_id: result.public_id,
            category: req.body.catagory,
            description: req.body.discription
        });

        // Delete local image
        fs.unlinkSync(req.file.path);

        res.redirect("/gallery");

    } catch (err) {
        console.log(err);
        // Delete local file even if upload fails
        if (req.file) {
            fs.unlink(req.file.path, () => {});
        }

        res.status(500).send("Upload Failed");
    }

});


// gallery
app.get("/gallery", async (req, res) => {
    try {

        const categories = await gallerySchema.distinct("category");

        let images;

        if (req.query.category) {
            images = await gallerySchema.find({
                category: req.query.category
            });
        } else {
            // Default: show all images
            images = await gallerySchema.find();
        }

        res.render("gallery", {
            categories,
            images,
            selectedCategory: req.query.category || "All Images"
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// Dashboard
app.get("/admin", (req, res) => {

    if (!req.cookies.token) {
        return res.redirect("/login");
    }

    try {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        res.render("admin");
    } catch (err) {
        res.redirect("/login");
    }

});

// Logout
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

// ================= Server =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});