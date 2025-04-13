// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import quizService from '../services/quizService';
import { useAuth } from '../context/AuthContext'; // To get current user for filtering 'My Quizzes'

function DashboardPage() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser } = useAuth(); // Get current user

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await quizService.getAllQuizzes(); // Fetch all quizzes
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
    }, []); // Fetch on component mount

    // Filter quizzes created by the current user
    const myQuizzes = quizzes.filter(quiz => quiz.createdBy?._id === currentUser?._id);
    // Filter quizzes created by others
    const otherQuizzes = quizzes.filter(quiz => quiz.createdBy?._id !== currentUser?._id);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {currentUser?.username}!</p>

            <Link to="/create-quiz" style={{ marginBottom: '20px', display: 'inline-block' }}>
                Create New Quiz
            </Link>

            {loading && <p>Loading quizzes...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && (
                <div>
                    {/* Quizzes Created By Me */}
                    <h3>My Quizzes</h3>
                    {myQuizzes.length > 0 ? (
                        <ul>
                            {myQuizzes.map(quiz => (
                                <li key={quiz._id}>
                                    <strong>{quiz.title}</strong> - {quiz.description}
                                     ({quiz.questions?.length || 0} questions)
                                    <Link to={`/quiz/${quiz._id}/add-questions`} style={{ marginLeft: '10px' }}>Add/Edit Questions</Link>
                                    {/* Add Take Quiz link if desired */}
                                    <Link to={`/quiz/${quiz._id}/take`} style={{ marginLeft: '10px' }}>Take Quiz</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You haven't created any quizzes yet.</p>
                    )}

                     {/* Quizzes Created By Others */}
                    <h3 style={{marginTop: '30px'}}>Other Quizzes</h3>
                     {otherQuizzes.length > 0 ? (
                        <ul>
                            {otherQuizzes.map(quiz => (
                                <li key={quiz._id}>
                                    <strong>{quiz.title}</strong> (by {quiz.createdBy?.username || 'Unknown'}) - {quiz.description}
                                     ({quiz.questions?.length || 0} questions)
                                    <Link to={`/quiz/${quiz._id}/take`} style={{ marginLeft: '10px' }}>Take Quiz</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                         <p>No other quizzes available right now.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default DashboardPage;