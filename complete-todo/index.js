const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");

mongoose.connect("mongodb+srv://kousikv5:c5yPw41Z6HASQ49V@cluster0.1k5if.mongodb.net/todo-db")
    .then(() => {
        console.log("Connected Successfully");
    })
    .catch((e) => {
        console.log(`Mongo DB is not connected: ${e}`);
    });

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Routes for the API
app.post("/signup", async (req, res) => {
    const { name, password } = req.body;
    await UserModel.create({ name, password });
    res.json({ message: "You are signed up" });
});

app.post("/signin", async (req, res) => {
    const { name, password } = req.body;
    const response = await UserModel.findOne({ name, password });
    if (response) {
        const token = jwt.sign({ id: response._id }, JWT_SECRET);
        res.json(token);
    } else {
        res.status(403).json("Invalid credentials");
    }
});

app.post("/todo", auth, async (req, res) => {
    const { userId } = req
    const { title, done } = req.body;
    await TodoModel.create({ userId, title, done });
    res.json({ message: "Todo created" });
});

app.get("/todo", auth, async (req, res) => {
    const { userId } = req;
    const todos = await TodoModel.find({ userId });
    res.json({ todos });
});

// New route for deleting a todo
app.delete("/todo/:id", auth, async (req, res) => {
    const { userId } = req;
    const todoId = req.params.id;

    console.log(typeof(todoId));

    try {
        const todo = await TodoModel.findOne({ _id: todoId, userId });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found or you don't have permission to delete it" });
        }

        await TodoModel.findByIdAndDelete(todoId);
        res.json({ message: `Todo Task completed successfully ${typeof(todoId)}` });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: "An error occurred while deleting the todo" });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on 0.0.0.0:3000');
  });
  