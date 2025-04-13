// backend/routes/auth.js
const express = require('express');
const { register, login, getMe } = require('../controllers/auth');
const { protect } = require('../middleware/auth'); // Import protect middleware

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe); // Protect the 'me' route

module.exports = router;