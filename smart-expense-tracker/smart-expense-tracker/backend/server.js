const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/expense_tracker")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Models
const User = require("./models/User");
const Expense = require("./models/Expense");

// Routes
app.use("/api/expenses", require("./routes/expenses"));

// Register
app.post("/api/register", async (req, res) => {
  await User.create(req.body);
  res.send("User Registered");
});

// Login
app.post("/api/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) res.json({ userId: user._id });
  else res.status(400).send("Invalid credentials");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

