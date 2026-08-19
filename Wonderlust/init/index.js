const data = require("./data.js");
const Listing = require("../models/listing.js");
const listing = require("../models/listing.js");

const addData = async () => {
    await listing.deleteMany({});
    for (let i = 0; i < data.length; i++) {
        await Listing.create({
            title: data[i].title,
            description: data[i].description,
            image_url: data[i].image.url,
            price: data[i].price,
            location: data[i].location,
            country: data[i].country
        });
    }

    console.log("Data added successfully");
};

addData();