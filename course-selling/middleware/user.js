const jwt = require("jsonwebtoken");

const { JWT_USER_SECRET } = require("../config")


function userMiddleware(req, res, next) {

    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Access denided , no token provided"
        });
    }


    try {
        const decoded = jwt.verify(token, JWT_USER_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (e) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

}

module.exports = {
    userMiddleware: userMiddleware
}

