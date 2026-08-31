const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/todoapp")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Error:", error);
  });


// Todo Schema
const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


// Todo Model
const Todo = mongoose.model("Todo", todoSchema);


// GET - Get all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch todos",
    });
  }
});


// POST - Create todo
app.post("/api/todos", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Todo text is required",
      });
    }

    const todo = await Todo.create({
      text: text.trim(),
    });
    console.log(req.body);

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create todo",
    });
  }
});


// PATCH - Update todo
app.patch("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update todo",
    });
  }
});


// DELETE - Delete todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete todo",
    });
  }
});


// Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});