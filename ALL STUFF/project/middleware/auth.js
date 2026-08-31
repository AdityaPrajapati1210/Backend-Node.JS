const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        res.locals.isLoggedIn = false;
        return next();
    }

    try {
        const data = jwt.verify(token, "shhhhh");

        req.admin = data;
        res.locals.isLoggedIn = true;
        res.locals.admin = data;

    } catch (err) {
        res.locals.isLoggedIn = false;
    }

    next();
};

module.exports = checkLogin;