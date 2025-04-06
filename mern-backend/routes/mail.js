const express = require("express");
const jwt = require("jsonwebtoken");
const Mail = require("../models/Mail");

const router = express.Router();
const JWT_SECRET = "supersecretkey"; // Hardcoded

// Auth middleware
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(403).json({ error: "Invalid token" });
    }
}

// GET /api/mails
router.get("/", authMiddleware, async (req, res) => {
    const mails = await Mail.find({ userId: req.user.userId });
    res.json(mails);
});

module.exports = router;
