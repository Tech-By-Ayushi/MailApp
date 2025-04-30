const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User.model");

const authRouter = express.Router();
const JWT_SECRET = "supersecretkey"; // Hardcoded

// Register
authRouter.post("/register", async (req, res) => {

    try {
        const { name, email, password, dob } = req.body;

        const existing = await User.findOne({ email });

        if (existing)
            return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            dob: dob
        });

        await newUser.save();
        res.status(201).json({ message: "Registered", userId: newUser._id.toString() });

    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Login
authRouter.post("/login", async (req, res) => {

    const { email, password } = req.body;
    console.log("Login attempt:", email);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("Invalid credentials");
            return res.status(401).json({ error: "Invalid credentials" });
        }

        //Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Wrong Password" });
        }

        // Generate the jwt token
        const token = jwt.sign({ userId: user._id, username: user.name, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        const userId = user._id.toString();

        const sessions = req.app.locals.sessions;
        sessions.set(userId, true);

        console.log("✅ Login success for:", userId);

        res.status(200).json({ userId: userId, token: token, username: user.name, email: user.email, userId: user._id });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = authRouter;
