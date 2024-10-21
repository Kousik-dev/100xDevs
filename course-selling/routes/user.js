const { Router } = require("express");
const { userModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_USER_SECRET} = require("../config");
const userRouter = Router();
const {userMiddleware} = require("../middleware/user")

userRouter.post("/signup", async function (req, res) {

    const { email, password, firstName, lastName } = req.body;


    try {
        await userModel.create({
            email,
            password,
            firstName,
            lastName
        })
    }
    catch (e) {
        console.log(`error is ${e}`);
    }
    res.json({
        message: "signup endpoint"
    })
})

userRouter.post("/signin", async function (req, res) {

    const { email, password } = req.body;
    const user = await userModel.findOne({
        email,
        password
    })

    if (user) {

        const token = jwt.sign({
            id: user._id
        }, JWT_USER_SECRET);

        res.json({
            token: token
        });
    }

    res.status(403).json({
        message: "incorrect credentails"
    })
})

userRouter.get("/purchases", userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;

        // Fetch the user's purchases and populate the course details using 'courseId' reference
        const purchases = await purchaseModel.find({ userId }).populate('courseId');

        // Extract courses directly from the populated purchases
        const coursesData = purchases.map(purchase => purchase.courseId);

        res.json({
            purchases,
            coursesData
        });
    } catch (error) {
        // Handle errors and return an appropriate response
        console.error("Error fetching purchases:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = {
     userRouter
}