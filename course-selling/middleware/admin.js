const jwt = require("jsonwebtoken");
const {JWT_ADMIN_SECRET} = require("../config");

function adminMiddleware(req,res,next){
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({
            message:"Access denied, No Token Provided"
        })
    }

    try{
        const decoded = jwt.verify(token, JWT_ADMIN_SECRET);
        req.userId = decoded.id;
        next();
    }

    catch(e){
        return res.status(401).json({
            message: "Invalid token."
        })
    }
}

module.exports = {
    adminMiddleware
}