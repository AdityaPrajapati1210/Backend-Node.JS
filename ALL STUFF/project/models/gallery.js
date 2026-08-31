const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Gallery", gallerySchema);