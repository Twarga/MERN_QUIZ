// src/pages/TakeQuizPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizService from '../services/quizService';

function TakeQuizPage() {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Store answers as { questionIndex: selectedOption }
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuiz = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await quizService.getQuizById(quizId);
                if (!response.data.data || response.data.data.questions?.length === 0) {
                     setError('Quiz not found or has no questions.');
                     setQuiz(null);
                } else {
                    setQuiz(response.data.data);
                }
            } catch (err) {
                console.error("Error fetching quiz for taking:", err);
                setError('Failed to load the quiz. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [quizId]);

    const handleAnswerSelect = (questionIndex, selectedOption) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: selectedOption
        });
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitQuiz = async () => {
         // Optional: Check if all questions are answered
        if (Object.keys(selectedAnswers).length !== quiz.questions.length) {
             if (!window.confirm('You have not answered all questions. Submit anyway?')) {
                 return;
             }
         }

        setSubmitting(true);
        setError('');

        // Format answers for the backend
        const answersToSubmit = quiz.questions.map((q, index) => ({
            questionIndex: index, // Send index to match backend expectation
            selectedAnswer: selectedAnswers[index] || null // Send selected answer or null if not answered
        }));


        try {
            const response = await quizService.submitQuiz(quizId, answersToSubmit);
             // Redirect to results page, passing score and totalQuestions via state
            navigate(`/quiz/${quizId}/results`, { state: { score: response.data.score, totalQuestions: response.data.totalQuestions } });
        } catch (err) {
             console.error("Error submitting quiz:", err);
             const message = err.response?.data?.message || 'Failed to submit quiz.';
             setError(message);
             setSubmitting(false);
        }
    };

    if (loading) return <div>Loading Quiz...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
    if (!quiz) return <div>Quiz not found or is empty.</div>; // Should be caught by error state usually

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div>
            <h2>Taking Quiz: {quiz.title}</h2>
            <p>{quiz.description}</p>
            <hr />

            {/* Question Display */}
            <div>
                <h3>Question {currentQuestionIndex + 1} of {quiz.questions.length}</h3>
                <p style={{fontWeight: 'bold'}}>{currentQuestion.questionText}</p>

                {/* Options */}
                <form>
                    {currentQuestion.options.map((option, index) => (
                        <div key={index} style={{ margin: '10px 0' }}>
                            <label>
                                <input
                                    type="radio"
                                    name={`question_${currentQuestionIndex}`}
                                    value={option}
                                    checked={selectedAnswers[currentQuestionIndex] === option}
                                    onChange={() => handleAnswerSelect(currentQuestionIndex, option)}
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                </form>
                 {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </div>

            {/* Navigation and Submission Buttons */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
                    Previous
                </button>

                {currentQuestionIndex === quiz.questions.length - 1 ? (
                    // Show Submit button on the last question
                    <button onClick={handleSubmitQuiz} disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Quiz'}
                    </button>
                ) : (
                    // Show Next button otherwise
                    <button onClick={goToNextQuestion} disabled={!selectedAnswers[currentQuestionIndex]}> {/* Optionally disable Next until an answer is selected */}
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}

export default TakeQuizPage;