const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const mailRouter = require("./routes/mail");

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
app.locals.sessions = sessions;

// ------------------ ROUTES ------------------ //
app.use('/api/auth/', authRouter);
app.use('/api/mails/', mailRouter);


// Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
