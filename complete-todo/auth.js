const jwt = require("jsonwebtoken");
const JWT_SECRET = "hihowareyou";

function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // Check if Authorization header is valid
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (e) {
        res.status(400).json({ message: "Invalid token" });
    }
}

module.exports = {
    auth,
    JWT_SECRET,
};
