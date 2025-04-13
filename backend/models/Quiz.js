// backend/models/Quiz.js
const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    // We'll embed questions directly for simplicity in this version
    // Alternatively, questions could be a separate collection referencing the quiz ID
    questions: [{
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }], // Array of possible answers
        correctAnswer: { type: String, required: true } // Store the correct answer text
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Quiz', QuizSchema);