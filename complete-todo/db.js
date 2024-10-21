const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const User = new Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

// Todo Schema
const Todo = new Schema({
    userId: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    done: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

// Models
const UserModel = mongoose.model("User", User);
const TodoModel = mongoose.model("Todo", Todo);

module.exports = {
    UserModel,
    TodoModel
};
