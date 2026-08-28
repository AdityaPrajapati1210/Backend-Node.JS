const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/wonderlust")
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
});

const listingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            // minlength: [3, "Title must be at least 3 characters"],
            // maxlength: [100, "Title cannot exceed 100 characters"]
        },

        description: {
            type: String,
            required: true,
            trim: true,
            // minlength: [10, "Description must be at least 10 characters"],
            // maxlength: [1000, "Description cannot exceed 1000 characters"]
        },

        image_url: {
            type: String,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            // min: [0, "Price cannot be negative"],
            // max: [10000000, "Price is too high"]
        },

        location: {
            type: String,
            required: true,
            trim: true,
            // minlength: [2, "Location must be at least 2 characters"],
            // maxlength: [100, "Location cannot exceed 100 characters"]
        },

        country: {
            type: String,
            required: true,
            trim: true,
            // minlength: [2, "Country name is too short"],
            // maxlength: [50, "Country name is too long"]
        }
    },
);

module.exports = mongoose.model("Listing", listingSchema);