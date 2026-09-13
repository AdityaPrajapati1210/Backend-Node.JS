const data = require("./data.js");
const listing = require("../models/listing.js");

const addData = async () => {
    await listing.deleteMany({});
    for (let i = 0; i < data.length; i++) {
        await listing.create({
            title: data[i].title,
            description: data[i].description,
            image_url: data[i].image.url,
            price: data[i].price,
            location: data[i].location,
            country: data[i].country,
            userId:data[i].userId
        });
    }

    console.log("Data added successfully");
};

addData();
