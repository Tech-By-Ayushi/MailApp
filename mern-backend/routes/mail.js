const express = require("express");
const jwt = require("jsonwebtoken");
const Mail = require("../model/Mail.model.js");
const { authMiddleware } = require('../middleware/auth.middleware.js');
const User = require('../model/User.model.js');

const mailRouter = express.Router();



// GET /api/mails/
mailRouter.get("/", authMiddleware, async (req, res) => {

    const user = req.user;
    console.log(user)

    const mails = await Mail.find({ userId: req.user.userId });
    res.json(mails);
});

mailRouter.post("/send-mail", authMiddleware, async (req, res) => {

    try {

        const senderMail = req.user.email;
        const recipientMail = req.body.recipient;
        const { subject, body } = req.body;

        console.log(senderMail, recipientMail);

        const recipientUser = await User.findOne({ email: recipientMail });
        const senderUser = await User.findOne({ email: senderMail });

        if (!recipientUser) {
            console.log("Recipient mail not found!");
        }


        const newMail = new Mail({
            to: recipientUser._id,
            from: senderUser._id,
            subject: subject,
            body: body
        });

        await newMail.save();

        res.status(201).json({ message: "Message Sent" });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }

});

// Get mails for logged-in user
mailRouter.get("/:userId", async (req, res) => {

    const { userId } = req.params;

    console.log("📬 Looking for mails of:", userId); // <-- add this

    const sessions = req.app.locals.sessions;
    if (!sessions.has(userId)) {
        console.log("❌ Unauthorized access to mails");
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const mails = await Mail.find({ to: userId }); // string match
        console.log("📦 Mails found:", mails); // <-- and this

        res.status(200).json(mails);
    } catch (err) {
        console.error("Mail fetch error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = mailRouter;