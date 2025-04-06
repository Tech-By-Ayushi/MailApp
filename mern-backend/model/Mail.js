const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  userId: String, // store userId as string
  subject: String,
  body: String,
});

module.exports = mongoose.model("Mail", mailSchema);
