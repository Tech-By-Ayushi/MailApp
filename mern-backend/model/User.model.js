// models/User.js

const mongoose = require('mongoose');

// Define the schema for the user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Ensures the name field is required
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,  // Ensures email is unique in the database
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Optional regex validation for email format
  },
  password: {
    type: String,
    required: true,  // Ensures password is required
  },
  dob: {
    type: Date,
    required: true,  // Ensures the Date of Birth is required
  },
}, {
  timestamps: true,  // Automatically adds `createdAt` and `updatedAt` fields
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
