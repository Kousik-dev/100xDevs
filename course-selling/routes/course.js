const { Router } = require("express");

const {userMiddleware} = require("../middleware/user");
const {courseModel, purchaseModel} = require("../db")
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware,async function(req, res) {
    // you would expect the user to pay you money

    const userId = req.userId;
    const {courseId} = req.body;
    
    const response = await purchaseModel.create({
        userId,
        courseId
    })

    if(response){
        return res.status(200).json({
            message:"you have successfully purchase the course"
        })
    }
})



courseRouter.get("/preview", async function(req, res) {

    const course = await courseModel.find({});

    res.json({
        courses:course
    })
})

module.exports = {
     courseRouter
}