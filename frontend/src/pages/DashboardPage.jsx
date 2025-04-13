import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import quizService from '../services/quizService';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await quizService.getAllQuizzes();
                setQuizzes(response.data.data);
                setError('');
            } catch (err) {
                console.error("Error fetching quizzes:", err);
                setError('Failed to load quizzes.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    // Filter quizzes created by the current user
    const myQuizzes = quizzes.filter(quiz => quiz.createdBy?._id === currentUser?._id);
    // Filter quizzes created by others
    const otherQuizzes = quizzes.filter(quiz => quiz.createdBy?._id !== currentUser?._id);

    // Function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return <div className="spinner"></div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>My Dashboard</h1>
                <Link to="/create-quiz" className="btn">Create New Quiz</Link>
            </div>

            {error && (
                <div className="alert alert-error">
                    <p>{error}</p>
                </div>
            )}

            <div className="dashboard-section">
                <h2>My Quizzes</h2>
                {myQuizzes.length > 0 ? (
                    <div className="quiz-list">
                        {myQuizzes.map(quiz => (
                            <div key={quiz._id} className="quiz-item">
                                <div className="quiz-item-header">
                                    <h3>{quiz.title}</h3>
                                </div>
                                <div className="quiz-item-body">
                                    <p>{quiz.description}</p>
                                    <div className="quiz-stats">
                                        <div className="quiz-stat-item">
                                            <span role="img" aria-label="questions">❓</span> {quiz.questions?.length || 0} questions
                                        </div>
                                        <div className="quiz-stat-item">
                                            <span role="img" aria-label="date">📅</span> {formatDate(quiz.createdAt)}
                                        </div>
                                    </div>
                                </div>
                                <div className="quiz-item-footer">
                                    <Link to={`/quiz/${quiz._id}/take`} className="btn btn-outline">Take Quiz</Link>
                                    <Link to={`/quiz/${quiz._id}/add-questions`} className="btn">Edit Questions</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>You haven't created any quizzes yet.</p>
                        <Link to="/create-quiz" className="btn">Create Your First Quiz</Link>
                    </div>
                )}
            </div>

            <div className="dashboard-section">
                <h2>Explore Quizzes</h2>
                {otherQuizzes.length > 0 ? (
                    <div className="quiz-list">
                        {otherQuizzes.map(quiz => (
                            <div key={quiz._id} className="quiz-item">
                                <div className="quiz-item-header">
                                    <h3>{quiz.title}</h3>
                                </div>
                                <div className="quiz-item-body">
                                    <p>{quiz.description}</p>
                                    <div className="quiz-stats">
                                        <div className="quiz-stat-item">
                                            <span role="img" aria-label="author">👤</span> By {quiz.createdBy?.username || 'Unknown'}
                                        </div>
                                        <div className="quiz-stat-item">
                                            <span role="img" aria-label="questions">❓</span> {quiz.questions?.length || 0} questions
                                        </div>
                                    </div>
                                </div>
                                <div className="quiz-item-footer">
                                    <Link to={`/quiz/${quiz._id}/take`} className="btn">Take Quiz</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>No other quizzes available right now.</p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .dashboard-container {
                    padding-bottom: 2rem;
                }
                
                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                
                .dashboard-section {
                    margin-bottom: 3rem;
                }
                
                .empty-state {
                    background: white;
                    padding: 2rem;
                    text-align: center;
                    border-radius: var(--border-radius-md);
                    box-shadow: var(--shadow-sm);
                }
                
                .empty-state p {
                    margin-bottom: 1rem;
                    color: var(--dark);
                }
                
                @media (max-width: 768px) {
                    .dashboard-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }
                    
                    .dashboard-header .btn {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}

export default DashboardPage;