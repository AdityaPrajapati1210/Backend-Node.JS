const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const listing = require("../models/listing.js");
const Review = require('../models/review.js');
const { reviewSchema } = require('../schema.js');

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details
            .map((el) => el.message)
            .join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

router.get("/", (req, res) => {
    res.render("listing/addlisting");
})
router.post("/", wrapAsync(async (req, res, next) => {              //add to listing
    if (!req.body) {
        throw new ExpressError(501, "Data not found");
    }
    const { title, description, price, location, country } = req.body;
    let { image_url } = req.body;
    if (!image_url) {
        image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSltdyesaETmIsYYdxPW3gcpIW0LCkUWaTdcCzKII5VMw&s=10";
    }
    await listing.create({
        title,
        description,
        image_url,
        price,
        location,
        country
    })
    res.redirect("/home");
}))

router.get("/:id", wrapAsync(async (req, res, next) => {                //details edit page
    const data = await listing.findById(req.params.id).populate("review");
    // console.log(data);
    res.render("listing/listingDetails", { data: data });
}))

router.get("/:id/edit", wrapAsync(async (req, res, next) => {                 //edit page khol k dega
    const data = await listing.findById(req.params.id);
    res.render("listing/edit", { data: data });
}))

router.patch("/:id", wrapAsync(async (req, res, next) => {
    await listing.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/listing/${req.params.id}`);
}))

router.delete("/:id", wrapAsync(async (req, res, next) => {
    await listing.findByIdAndDelete(req.params.id);
    res.redirect("/alllisting");
}))

// add review
router.post("/:id/review", validateReview, wrapAsync(async (req, res, next) => {

    console.log("1. request aayi h");
    console.log("2. ID:", req.params.id);
    console.log("3. BODY:", req.body);

    const comeListing = await listing.findById(req.params.id);

    console.log("4. listing mili:", comeListing);

    const { comment, rating } = req.body;

    console.log("5. comment:", comment);
    console.log("6. rating:", rating);

    if (!comment || !rating) {
        throw new ExpressError(400, "Data not found");
    }

    console.log("7. creating review...");

    const newReview = await Review.create({
        comment,
        rating
    });

    console.log("8. review created:", newReview);

    comeListing.review.push(newReview._id);

    console.log("9. review pushed");

    await comeListing.save();

    console.log("10. listing saved");

    res.json({
        _id: newReview._id,
        rating: newReview.rating,
        comment: newReview.comment
    });
}));

// remove Review
router.delete("/:id/review/:reviewId", wrapAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`);
}))

module.exports = router;