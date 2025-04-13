import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizService from '../services/quizService';

function TakeQuizPage() {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
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
                console.error("Error fetching quiz:", err);
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
        if (Object.keys(selectedAnswers).length !== quiz.questions.length) {
            if (!window.confirm('You have not answered all questions. Submit anyway?')) {
                return;
            }
        }

        setSubmitting(true);
        setError('');

        const answersToSubmit = quiz.questions.map((q, index) => ({
            questionIndex: index,
            selectedAnswer: selectedAnswers[index] || null
        }));

        try {
            const response = await quizService.submitQuiz(quizId, answersToSubmit);
            navigate(`/quiz/${quizId}/results`, { 
                state: { 
                    score: response.data.score, 
                    totalQuestions: response.data.totalQuestions 
                } 
            });
        } catch (err) {
            console.error("Error submitting quiz:", err);
            const message = err.response?.data?.message || 'Failed to submit quiz.';
            setError(message);
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="spinner"></div>;
    }

    if (error && !quiz) {
        return (
            <div className="error-container">
                <div className="alert alert-error">
                    <h3>Error</h3>
                    <p>{error}</p>
                    <button className="btn" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (!quiz) return null;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h1>{quiz.title}</h1>
                <p>{quiz.description}</p>

                <div className="progress-container">
                    <div 
                        className="progress-bar" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="progress-text">
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </div>
            </div>

            {error && (
                <div className="alert alert-error">
                    {error}
                </div>
            )}

            <div className="question-card">
                <div className="question-number">Question {currentQuestionIndex + 1}</div>
                <div className="question-text">{currentQuestion.questionText}</div>

                <div className="options-container">
                    {currentQuestion.options.map((option, index) => (
                        <div 
                            key={index}
                            className={`option-item ${selectedAnswers[currentQuestionIndex] === option ? 'selected' : ''}`}
                            onClick={() => handleAnswerSelect(currentQuestionIndex, option)}
                        >
                            <input
                                type="radio"
                                id={`option-${index}`}
                                name={`question-${currentQuestionIndex}`}
                                value={option}
                                checked={selectedAnswers[currentQuestionIndex] === option}
                                onChange={() => handleAnswerSelect(currentQuestionIndex, option)}
                            />
                            <label htmlFor={`option-${index}`}>{option}</label>
                        </div>
                    ))}
                </div>

                <div className="navigation-buttons">
                    <button 
                        onClick={goToPreviousQuestion} 
                        disabled={currentQuestionIndex === 0}
                        className="btn btn-outline"
                    >
                        Previous
                    </button>

                    {currentQuestionIndex === quiz.questions.length - 1 ? (
                        <button 
                            onClick={handleSubmitQuiz} 
                            disabled={submitting}
                            className="btn"
                        >
                            {submitting ? 'Submitting...' : 'Submit Quiz'}
                        </button>
                    ) : (
                        <button 
                            onClick={goToNextQuestion} 
                            className="btn"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>

            <style jsx>{`
                .quiz-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 2rem 1rem;
                }
                
                .quiz-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                
                .quiz-header p {
                    margin-bottom: 2rem;
                    color: var(--dark);
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                }
                
                .progress-text {
                    margin-top: 0.5rem;
                    font-weight: 500;
                    color: var(--primary);
                }
                
                .error-container {
                    max-width: 600px;
                    margin: 3rem auto;
                }
                
                .option-item {
                    cursor: pointer;
                }
                
                .option-item label {
                    cursor: pointer;
                    display: block;
                    width: 100%;
                    margin-bottom: 0;
                    font-weight: normal;
                }
            `}</style>
        </div>
    );
}

export default TakeQuizPage;