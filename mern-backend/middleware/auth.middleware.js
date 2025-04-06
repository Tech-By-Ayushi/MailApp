const jwt = require('jsonwebtoken');

const JWT_SECRET = "supersecretkey"; // Hardcoded

function authMiddleware(req, res, next) {

    // Get the token from the request headers
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    // Remove the 'Bearer ' prefix if it's included in the token string
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    // Verify the token
    jwt.verify(tokenWithoutBearer, JWT_SECRET, (err, decoded) => {
        if (err) {
            // if verification fails, send an error response
            return res.status(401).json({ error: "Invalid or expired token" });
        }

        // If token is valid ,save the decoded uesr info to the request object
        req.user = decoded;
        next();
    });
}

module.exports = {
    JWT_SECRET,
    authMiddleware
};