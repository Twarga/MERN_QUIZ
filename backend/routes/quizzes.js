// backend/routes/quizzes.js
const express = require('express');
const {
    getQuizzes,
    getQuiz,
    createQuiz,
    addQuestionToQuiz,
    submitQuiz // Import submitQuiz
} = require('../controllers/quizzes');

const { protect } = require('../middleware/auth'); // Import protect middleware

const router = express.Router();

// Public route to get all quizzes
router.route('/')
    .get(getQuizzes)
    .post(protect, createQuiz); // Protect quiz creation

// Route to get a single quiz (needs login to take) and submit answers
router.route('/:id')
    .get(protect, getQuiz); // Protect getting a single quiz detail

// Route to add a question to a quiz (protected, needs creator auth inside controller)
router.route('/:id/questions')
    .post(protect, addQuestionToQuiz);

// Route to submit quiz answers
router.route('/:id/submit')
    .post(protect, submitQuiz); // Protect submission

module.exports = router;