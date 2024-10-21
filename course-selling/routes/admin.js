const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const {adminMiddleware} = require("../middleware/admin")

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body; // Fixed typo
    try {
        const response = await adminModel.create({
            email,
            password,
            firstName,
            lastName
        });

        return res.status(201).json({ // Changed to 201
            message: "Admin account created successfully",
            adminId: response._id // Optionally return the created admin ID
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to create admin account",
            error: error.message
        });
    }
});

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await adminModel.findOne({ email, password }); // Added await

        if (response) {
            const token = jwt.sign({ id: response._id }, JWT_ADMIN_SECRET);
            return res.status(200).json({ token });
        } else {
            return res.status(403).json({
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred during sign-in",
            error: error.message
        });
    }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const { title, content, price, imageUrl } = req.body;
    try {
        const course = await courseModel.create({
            title,
            content,
            price,
            imageUrl,
            creatorId: adminId
        });

        return res.status(201).json({ // Changed to 201
            message: "Course created successfully",
            courseId: course._id
        });
    } catch (error) {
        return res.status(500).json({
            message: "Course could not be created",
            error: error.message
        });
    }
});

adminRouter.put("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/course/all", adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    try {
        const courses = await courseModel.find({ creatorId: adminId });

        if (courses.length > 0) { // Fixed condition
            return res.status(200).json({
                message: `All courses of this creatorId are ${adminId}`,
                courses
            });
        } else {
            return res. status(204).json({
                message: "Creator has not created any courses"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while retrieving courses",
            error: error.message
        });
    }
});

module.exports= {
    adminRouter
}
