const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const userSchema = new Schema({

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },



}, { timestamps: true })


const adminSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
}, { timestamps: true })


const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    imageUrl: String,

    creatorId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Admin'

    }


}, { timestamps: true })

const purchaseSchema = new Schema({

    userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },

    courseId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Course'
    }

}, { timestamps: true })

const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);

module.exports = {
   userModel,
   adminModel,
   courseModel,
   purchaseModel

}