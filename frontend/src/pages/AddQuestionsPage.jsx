import React, { useState, useEffect } from 'react';
import quizService from '../services/quizService';
import { useParams, useNavigate, Link } from 'react-router-dom';

function AddQuestionsPage() {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [quizTitle, setQuizTitle] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [questionsAdded, setQuestionsAdded] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchingQuiz, setFetchingQuiz] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch quiz details
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await quizService.getQuizById(quizId);
                setQuizTitle(response.data.data.title);
                setQuestionsAdded(response.data.data.questions || []);
            } catch (err) {
                console.error("Error fetching quiz:", err);
                setError('Failed to load quiz details. Does the quiz exist?');
            } finally {
                setFetchingQuiz(false);
            }
        };
        fetchQuiz();
    }, [quizId]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
        
        if (options[index] === correctAnswer) {
            setCorrectAnswer(value);
        }
    };

    const addOptionField = () => {
        setOptions([...options, '']);
    };

    const removeOptionField = (index) => {
        if (options.length <= 2) return; // Keep at least 2 options
        
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
        
        // If the removed option was the correct answer, reset correctAnswer
        if (options[index] === correctAnswer) {
            setCorrectAnswer('');
        }
    };

    const handleCorrectAnswerChange = (option) => {
        setCorrectAnswer(option);
    };

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Basic Validation
        const filledOptions = options.filter(opt => opt.trim() !== '');
        if (questionText.trim() === '') {
            setError('Please enter a question');
            return;
        }
        if (filledOptions.length < 2) {
            setError('Please provide at least two options');
            return;
        }
        if (correctAnswer.trim() === '') {
            setError('Please select the correct answer');
            return;
        }
        if (!filledOptions.includes(correctAnswer)) {
            setError('The correct answer must be one of the provided options');
            return;
        }

        setLoading(true);

        const questionData = {
            questionText,
            options: filledOptions,
            correctAnswer
        };

        try {
            const response = await quizService.addQuestion(quizId, questionData);
            setQuestionsAdded(response.data.data.questions);
            
            // Reset the form
            setQuestionText('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
            setSuccessMessage('Question added successfully!');
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (err) {
            console.error("Add Question Error:", err);
            const message = err.response?.data?.message || 'Failed to add question.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (fetchingQuiz) {
        return <div className="spinner"></div>;
    }

    if (error && !quizTitle) {
        return (
            <div className="error-container">
                <div className="alert alert-error">
                    <h3>Error</h3>
                    <p>{error}</p>
                    <Link to="/dashboard" className="btn">Go to Dashboard</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="add-questions-container">
            <div className="quiz-info-header">
                <h1>Add Questions</h1>
                <div className="quiz-title">Quiz: {quizTitle}</div>
                
                <div className="questions-count">
                    <span className="count-number">{questionsAdded.length}</span> 
                    <span className="count-label">Questions Added</span>
                </div>
            </div>

            {/* Added Questions Section */}
            {questionsAdded.length > 0 && (
                <div className="added-questions-section">
                    <h2>Questions in this Quiz</h2>
                    <div className="questions-list">
                        {questionsAdded.map((q, index) => (
                            <div key={index} className="question-item">
                                <div className="question-number">{index + 1}</div>
                                <div className="question-content">
                                    <div className="question-text">{q.questionText}</div>
                                    <div className="question-options">
                                        {q.options.map((option, optIndex) => (
                                            <span 
                                                key={optIndex} 
                                                className={`option-tag ${option === q.correctAnswer ? 'correct' : ''}`}
                                            >
                                                {option}
                                                {option === q.correctAnswer && ' ✓'}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Add New Question Form */}
            <div className="add-question-card">
                <div className="card-header">
                    <h2>Add New Question</h2>
                </div>
                
                <div className="card-body">
                    {error && <div className="alert alert-error">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    
                    <form onSubmit={handleAddQuestion}>
                        <div className="form-group">
                            <label htmlFor="questionText" className="form-label">Question Text</label>
                            <input
                                type="text"
                                id="questionText"
                                className="form-control"
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                placeholder="Type your question here..."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Answer Options</label>
                            <div className="options-list">
                                {options.map((option, index) => (
                                    <div key={index} className="option-row">
                                        <div className="option-input">
                                            <input
                                                type="text"
                                                placeholder={`Option ${index + 1}`}
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="option-actions">
                                            <button 
                                                type="button"
                                                className={`btn-correct ${correctAnswer === option && option !== '' ? 'selected' : ''}`}
                                                onClick={() => option !== '' && handleCorrectAnswerChange(option)}
                                                disabled={option === ''}
                                            >
                                                {correctAnswer === option && option !== '' ? 'Correct ✓' : 'Mark Correct'}
                                            </button>
                                            <button 
                                                type="button"
                                                className="btn-remove"
                                                onClick={() => removeOptionField(index)}
                                                disabled={options.length <= 2}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {options.length < 6 && (
                                <button 
                                    type="button" 
                                    className="btn btn-outline add-option-btn"
                                    onClick={addOptionField}
                                >
                                    + Add Another Option
                                </button>
                            )}
                        </div>

                        <div className="form-actions">
                            <button 
                                type="submit" 
                                className="btn"
                                disabled={loading}
                            >
                                {loading ? 'Adding...' : 'Add Question'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div className="navigation-buttons">
                <Link to="/dashboard" className="btn btn-outline">
                    Finish & Go to Dashboard
                </Link>
                {questionsAdded.length > 0 && (
                    <Link to={`/quiz/${quizId}/take`} className="btn btn-secondary">
                        Preview Quiz
                    </Link>
                )}
            </div>

            <style jsx>{`
                .add-questions-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 1rem;
                }
                
                .quiz-info-header {
                    margin-bottom: 2rem;
                    text-align: center;
                }
                
                .quiz-title {
                    font-size: 1.25rem;
                    color: var(--secondary);
                    margin-bottom: 1rem;
                }
                
                .questions-count {
                    display: inline-flex;
                    align-items: center;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    border-radius: 50px;
                    padding: 0.5rem 1.5rem;
                    color: white;
                }
                
                .count-number {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-right: 0.5rem;
                }
                
                .added-questions-section {
                    background: white;
                    border-radius: var(--border-radius-lg);
                    box-shadow: var(--shadow-md);
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                }
                
                .questions-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .question-item {
                    display: flex;
                    background-color: rgba(67, 97, 238, 0.05);
                    border-radius: var(--border-radius-md);
                    overflow: hidden;
                }
                
                .question-number {
                    background: var(--primary);
                    color: white;
                    font-weight: 700;
                    padding: 1rem;
                    min-width: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .question-content {
                    padding: 1rem;
                    flex-grow: 1;
                }
                
                .question-options {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.75rem;
                }
                
                .option-tag {
                    background-color: var(--gray);
                    border-radius: 50px;
                    padding: 0.25rem 0.75rem;
                    font-size: 0.875rem;
                }
                
                .option-tag.correct {
                    background-color: var(--primary);
                    color: white;
                }
                
                .add-question-card {
                    background: white;
                    border-radius: var(--border-radius-lg);
                    box-shadow: var(--shadow-md);
                    margin-bottom: 2rem;
                    overflow: hidden;
                }
                
                .card-header {
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    color: white;
                    padding: 1.5rem;
                }
                
                .card-header h2 {
                    color: white;
                    margin: 0;
                }
                
                .card-header h2::after {
                    display: none;
                }
                
                .card-body {
                    padding: 1.5rem;
                }
                
                .options-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                
                .option-row {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }
                
                .option-input {
                    flex-grow: 1;
                }
                
                .option-actions {
                    display: flex;
                    gap: 0.5rem;
                }
                
                .btn-correct {
                    background: transparent;
                    border: 1px solid var(--primary);
                    color: var(--primary);
                    padding: 0.5rem 0.75rem;
                    border-radius: var(--border-radius-sm);
                    cursor: pointer;
                    font-size: 0.875rem;
                    transition: var(--transition);
                }
                
                .btn-correct.selected {
                    background: var(--primary);
                    color: white;
                }
                
                .btn-correct:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .btn-remove {
                    background: transparent;
                    border: 1px solid var(--warning);
                    color: var(--warning);
                    padding: 0.5rem 0.75rem;
                    border-radius: var(--border-radius-sm);
                    cursor: pointer;
                    font-size: 1.25rem;
                    line-height: 1;
                    transition: var(--transition);
                }
                
                .btn-remove:hover:not(:disabled) {
                    background: var(--warning);
                    color: white;
                }
                
                .btn-remove:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .add-option-btn {
                    margin-top: 1rem;
                    font-size: 0.875rem;
                    padding: 0.5rem 1rem;
                }
                
                .navigation-buttons {
                    display: flex;
                    justify-content: space-between;
                    gap: 1rem;
                }
                
                @media (max-width: 768px) {
                    .option-row {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    
                    .option-actions {
                        display: grid;
                        grid-template-columns: 1fr auto;
                    }
                    
                    .navigation-buttons {
                        flex-direction: column;
                    }
                    
                    .navigation-buttons .btn {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}

export default AddQuestionsPage;