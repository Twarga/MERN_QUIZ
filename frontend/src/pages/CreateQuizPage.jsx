import React, { useState } from 'react';
import quizService from '../services/quizService';
import { useNavigate } from 'react-router-dom';

function CreateQuizPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await quizService.createQuiz(title, description);
            const newQuizId = response.data.data._id;
            navigate(`/quiz/${newQuizId}/add-questions`);
        } catch (err) {
            console.error("Create Quiz Error:", err);
            const message = err.response?.data?.message || 'Failed to create quiz.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-quiz-container">
            <div className="create-quiz-card">
                <div className="create-quiz-header">
                    <h1>Create New Quiz</h1>
                    <p>Start by giving your quiz a title and description</p>
                </div>

                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="create-quiz-form">
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Quiz Title</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. History Trivia, Math Challenge"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Quiz Description</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe what your quiz is about..."
                            rows="4"
                            required
                        />
                    </div>

                    <div className="quiz-tips">
                        <h3>Tips for a Great Quiz</h3>
                        <ul>
                            <li>Keep questions clear and concise</li>
                            <li>Provide 3-4 options for each question</li>
                            <li>Make sure there's only one correct answer</li>
                            <li>Organize questions in a logical sequence</li>
                        </ul>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary create-quiz-btn" 
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Quiz & Add Questions'}
                    </button>
                </form>
            </div>

            <style jsx>{`
                .create-quiz-container {
                    max-width: 800px;
                    margin: 2rem auto;
                    padding: 0 1rem;
                }
                
                .create-quiz-card {
                    background: white;
                    border-radius: var(--border-radius-lg);
                    box-shadow: var(--shadow-md);
                    overflow: hidden;
                }
                
                .create-quiz-header {
                    padding: 2rem;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    color: white;
                }
                
                .create-quiz-header h1 {
                    color: white;
                    margin-bottom: 0.5rem;
                }
                
                .create-quiz-header p {
                    opacity: 0.9;
                    margin-bottom: 0;
                }
                
                .create-quiz-form {
                    padding: 2rem;
                }
                
                .quiz-tips {
                    margin: 2rem 0;
                    padding: 1.5rem;
                    background-color: rgba(67, 97, 238, 0.05);
                    border-left: 4px solid var(--primary);
                    border-radius: var(--border-radius-sm);
                }
                
                .quiz-tips h3 {
                    font-size: 1.1rem;
                    margin-bottom: 1rem;
                    color: var(--primary);
                }
                
                .quiz-tips ul {
                    margin-left: 1.5rem;
                    padding: 0;
                }
                
                .quiz-tips li {
                    margin-bottom: 0.5rem;
                }
                
                .create-quiz-btn {
                    width: 100%;
                    padding: 0.75rem;
                    margin-top: 1rem;
                }
            `}</style>
        </div>
    );
}

export default CreateQuizPage;