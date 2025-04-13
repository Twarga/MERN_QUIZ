// src/pages/CreateQuizPage.jsx
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
            const newQuizId = response.data.data._id; // Get the ID of the newly created quiz
            // Redirect to the page for adding questions to this new quiz
            navigate(`/quiz/${newQuizId}/add-questions`);
        } catch (err) {
            console.error("Create Quiz Error:", err);
            const message = err.response?.data?.message || 'Failed to create quiz.';
            setError(message);
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create New Quiz</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Quiz Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="3"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Quiz & Add Questions'}
                </button>
            </form>
        </div>
    );
}

export default CreateQuizPage;