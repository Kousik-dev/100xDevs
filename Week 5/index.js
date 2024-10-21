const express = require("express");
const app = express();
const cors = require("cors");

//app.use(cors());
app.use(express.json());


/*
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

*/

app.post("/sum", function(req, res) {
   // console.log(req.body); // Log the body to check what is being sent
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    console.log(a+b);

    res.json({
        answer: (a+b)
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
