const mongoose = require('mongoose');

// Define the schema for the Mail model
const mailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
    lowercase: true, // Ensure the 'to' email is stored in lowercase
    trim: true,      // Remove any extra spaces from the 'to' email
  },
  from: {
    type: String,
    required: true,
    lowercase: true, // Ensure the 'from' email is stored in lowercase
    trim: true,      // Remove any extra spaces from the 'from' email
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// You can use a pre-save hook to update the updatedAt field automatically
mailSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Mail model
const Mail = mongoose.model('Mail', mailSchema);

module.exports = Mail;
