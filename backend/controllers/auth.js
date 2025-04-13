// backend/controllers/auth.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Utility function to sign JWT
const getSignedJwtToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // Create user
        const user = await User.create({
            username,
            password, // Password will be hashed by the pre-save hook in User model
        });

        // Create token
        const token = getSignedJwtToken(user._id);

        res.status(201).json({ success: true, token });

    } catch (error) {
        console.error("Registration Error:", error);
        if (error.code === 11000) { // Duplicate key error (username)
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages });
        }
        res.status(500).json({ success: false, message: 'Server Error during registration' });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    // Validate username & password were entered
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Please provide a username and password' });
    }

    try {
        // Check for user
        const user = await User.findOne({ username }).select('+password'); // Explicitly include password

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Create token
        const token = getSignedJwtToken(user._id);

        res.status(200).json({ success: true, token });

    } catch (error) {
         console.error("Login Error:", error);
         res.status(500).json({ success: false, message: 'Server Error during login' });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    // req.user is set by the protect middleware
    const user = await User.findById(req.user.id);

     if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
     }

    res.status(200).json({
        success: true,
        data: user,
    });
};