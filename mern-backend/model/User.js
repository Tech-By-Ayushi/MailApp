const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String, // plain-text as requested
});

module.exports = mongoose.model("User", userSchema);
