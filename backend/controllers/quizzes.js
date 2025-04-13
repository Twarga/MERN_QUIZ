// backend/controllers/quizzes.js
const Quiz = require('../models/Quiz');
const User = require('../models/User'); // Might need for checking ownership etc.

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public (or Private if only logged-in users can see quizzes)
exports.getQuizzes = async (req, res, next) => {
    try {
        const quizzes = await Quiz.find().populate('createdBy', 'username'); // Populate creator's username
        res.status(200).json({ success: true, count: quizzes.length, data: quizzes });
    } catch (error) {
        console.error("Get Quizzes Error:", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single quiz (with questions for taking the quiz)
// @route   GET /api/quizzes/:id
// @access  Private (User must be logged in to take a quiz)
exports.getQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }

        // We send the full quiz details including questions here
        res.status(200).json({ success: true, data: quiz });
    } catch (error) {
        console.error("Get Single Quiz Error:", error);
        if (error.kind === 'ObjectId') {
             return res.status(404).json({ success: false, message: 'Quiz not found' });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create new quiz
// @route   POST /api/quizzes
// @access  Private (Only logged-in users can create)
exports.createQuiz = async (req, res, next) => {
    // Add logged-in user ID to the request body
    req.body.createdBy = req.user.id;

    // The request body should contain title, description, and potentially an initial list of questions
    // For now, let's assume questions are added separately
    const { title, description, questions } = req.body;

     if (!title || !description) {
         return res.status(400).json({ success: false, message: 'Please provide title and description' });
     }

    try {
        const quizData = {
            title,
            description,
            createdBy: req.user.id,
            questions: questions || [] // Allow creating with initial questions or empty
        };

        const quiz = await Quiz.create(quizData);
        res.status(201).json({ success: true, data: quiz });
    } catch (error) {
        console.error("Create Quiz Error:", error);
         if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Add a question to a specific quiz
// @route   POST /api/quizzes/:id/questions
// @access  Private (Only the creator should add questions? - Simple check for now)
exports.addQuestionToQuiz = async (req, res, next) => {
    const { questionText, options, correctAnswer } = req.body;

    // Basic validation
    if (!questionText || !options || !correctAnswer || !Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ success: false, message: 'Invalid question data. Need questionText, options (array, min 2), and correctAnswer.' });
    }
    if (!options.includes(correctAnswer)) {
         return res.status(400).json({ success: false, message: 'Correct answer must be one of the options.' });
    }

    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }

        // Authorization check: Ensure the logged-in user is the creator of the quiz
        if (quiz.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'User not authorized to add questions to this quiz' });
        }

        const newQuestion = {
            questionText,
            options,
            correctAnswer
        };

        quiz.questions.push(newQuestion);
        await quiz.save();

        res.status(201).json({ success: true, data: quiz }); // Return the updated quiz

    } catch (error) {
        console.error("Add Question Error:", error);
        if (error.kind === 'ObjectId') {
             return res.status(404).json({ success: false, message: 'Quiz not found' });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


// @desc    Submit quiz answers and calculate score
// @route   POST /api/quizzes/:id/submit
// @access  Private
exports.submitQuiz = async (req, res, next) => {
    const { answers } = req.body; // Expecting answers in format: [{ questionIndex: number, selectedAnswer: string }]
    const quizId = req.params.id;
    const userId = req.user.id;

    if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ success: false, message: 'Invalid submission format.' });
    }

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found.' });
        }

        let score = 0;
        let totalQuestions = quiz.questions.length;

        // Validate answers and calculate score
        answers.forEach(answer => {
            const questionIndex = answer.questionIndex;
            const selectedAnswer = answer.selectedAnswer;

            // Check if questionIndex is valid
            if (questionIndex >= 0 && questionIndex < totalQuestions) {
                const question = quiz.questions[questionIndex];
                if (question.correctAnswer === selectedAnswer) {
                    score++;
                }
            } else {
                 console.warn(`Invalid question index ${questionIndex} received for quiz ${quizId}`);
                 // Optionally handle this more strictly, e.g., return an error
            }
        });

        // Here you might want to save the submission/result to a new 'Submissions' collection
        // For simplicity now, we just return the score.
        // Example: await Submission.create({ user: userId, quiz: quizId, score, totalQuestions, answers });

        res.status(200).json({
            success: true,
            message: 'Quiz submitted successfully.',
            score: score,
            totalQuestions: totalQuestions
        });

    } catch (error) {
        console.error("Submit Quiz Error:", error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }
        res.status(500).json({ success: false, message: 'Server Error during submission.' });
    }
};
