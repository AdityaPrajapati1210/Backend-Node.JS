const ExpressError = require('./ExpressError');
const jwt = require('jsonwebtoken');
const ExpressError = require("./ExpressError");

const checkLogin = (req,res,next)=>{

    const token = req.cookies.token;
    if(!token){
        res.locals.isLoggedIn = false;
        return next();
    }

    try{
        const data = jwt.verify("token" , process.env.JWT_TOKEN);
        req.user = data;
        res.locals.isLoggedIn = true;
        res.loacls.user = data;

    }catch(err){
        throw new ExpressError(401,"Something went wrong");
    }

    next();
}

module.exports = checkLogin