const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "hidakousik";

const app = express();

app.use(express.json());

const users = [];

function logger(req, res, next) {
    console.log(`${req.method} is used`);
    next();
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const findUser = users.find(u => u.username === username);
    if (findUser) {
        return res.status(409).json({
            message: "Username is already registered"
        });
    }
    users.push({
        username: username,
        password: password
    });

    res.json({
        message: "You are signed up"
    });
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let findUser = users.find(u => u.username === username && u.password === password);

    if (!findUser) {
        return res.status(404).json({
            message: "Invalid credential"
        });
    }

    const token = jwt.sign({
        username: findUser.username
    }, JWT_SECRET);

    res.json({
        message: "You are signed in",
        token_id: token
    });
});

app.get("/me", (req, res) => {
    const token = req.headers.authorization;

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded.username);

    const findUser = users.find(u => u.username === decoded.username);

    res.json({
        username: findUser.username,
        password: findUser.password
    });
});

app.listen(3000, () => {
    console.log("Port is Listening on 3000");
});
