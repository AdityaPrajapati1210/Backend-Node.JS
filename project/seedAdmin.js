const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Admin = require("./models/admin");

async function seedAdmin() {
    await mongoose.connect(process.env.MONGO_URL);

    const exists = await Admin.findOne();

    if (exists) {
        console.log("Admin already exists");
        process.exit();
    }

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(process.env.PASSWORD, salt,async function(err, hash) {
            await Admin.create({
                username: process.env.NAME,
                password: hash
            });
            console.log("Admin created");
            process.exit();
        
        });
    });


}

seedAdmin();