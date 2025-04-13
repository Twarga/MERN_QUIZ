// src/pages/ResultsPage.jsx
import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';

function ResultsPage() {
    const location = useLocation();
    const { quizId } = useParams(); // Get quizId if needed for retake link etc.

    // Retrieve score and totalQuestions from location state
    // Provide default values in case state is missing (e.g., direct navigation)
    const { score = null, totalQuestions = null } = location.state || {};

    // Handle cases where state might be missing
    if (score === null || totalQuestions === null) {
        return (
            <div>
                <h2>Results Not Available</h2>
                <p>Could not retrieve quiz results. Perhaps you navigated here directly?</p>
                <Link to="/dashboard">Go to Dashboard</Link>
            </div>
        );
    }

    const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(1) : 0;

    return (
        <div>
            <h2>Quiz Results</h2>
            <p>You completed the quiz!</p>
            <h3>Your Score: {score} out of {totalQuestions}</h3>
            <h4>Percentage: {percentage}%</h4>

            {/* Add feedback based on score (optional) */}
            {percentage >= 80 && <p style={{ color: 'green' }}>Excellent work!</p>}
            {percentage >= 50 && percentage < 80 && <p style={{ color: 'orange' }}>Good job!</p>}
            {percentage < 50 && <p style={{ color: 'red' }}>Keep practicing!</p>}

            <div style={{ marginTop: '20px' }}>
                <Link to={`/quiz/${quizId}/take`} style={{ marginRight: '15px' }}>Retake Quiz</Link>
                <Link to="/dashboard">Back to Dashboard</Link>
                {/* Optional: Add a link to view detailed answers/corrections */}
            </div>
        </div>
    );
}

export default ResultsPage;