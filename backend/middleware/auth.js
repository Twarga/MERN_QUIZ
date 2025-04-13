// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    // Check for token in Authorization header (Bearer <token>)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    // Alternatively, check if token is in cookies (if using cookie-based auth)
    // else if (req.cookies.token) {
    //   token = req.cookies.token;
    // }

    // Make sure token exists
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to the request object
        req.user = await User.findById(decoded.id).select('-password'); // Exclude password

        if (!req.user) {
             return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};