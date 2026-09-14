const listing = require("../models/listing");

const isLoggedin = (req, res, next) => {
    // console.log("req");
    // console.log(req);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;

        req.flash("error", "You must be logged in");

        return res.redirect("/user/login");
    }
    next();
};


const saveRedirect = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    } else {
        res.locals.redirectUrl = "/home";
    }

    next();
};


const isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await listing.findById(id);
    if(!listing.userId.equals(res.locals.currUser._id)){
        res.flash("error","You don't have permission");
        res.redirect(`/listing/${id}`)
    }

    next()
}

module.exports = {
    isLoggedin,
    saveRedirect,
    isOwner
};