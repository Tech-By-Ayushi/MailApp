const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./model/User");
const Mail = require("./model/Mail");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors()); // Enables CORS for frontend connection

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mailApp")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Simple session map (in-memory)
const sessions = new Map();

// ------------------ ROUTES ------------------ //

// Register
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const newUser = await User.create({ email, password });
    res.status(201).json({ message: "Registered", userId: newUser._id.toString() });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      console.log("Invalid credentials");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const userId = user._id.toString();
    sessions.set(userId, true);
    console.log("✅ Login success for:", userId);
    res.json({ userId });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get mails for logged-in user
app.get("/api/mails/:userId", async (req, res) => {
  const { userId } = req.params;

  console.log("📬 Looking for mails of:", userId); // <-- add this

  if (!sessions.has(userId)) {
    console.log("❌ Unauthorized access to mails");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const mails = await Mail.find({ userId }); // string match
    console.log("📦 Mails found:", mails); // <-- and this

    res.json(mails);
  } catch (err) {
    console.error("Mail fetch error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
