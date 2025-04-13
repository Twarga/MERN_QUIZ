import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';

function ResultsPage() {
    const location = useLocation();
    const { quizId } = useParams();
    const navigate = useNavigate();
    
    // States for the progress circle animation
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    
    // Retrieve score and totalQuestions from location state
    const { score = null, totalQuestions = null } = location.state || {};
    
    // If score or totalQuestions is missing, show error
    if (score === null || totalQuestions === null) {
        return (
            <div className="results-container">
                <div className="card">
                    <h2>Results Not Available</h2>
                    <p>Could not retrieve quiz results. Perhaps you navigated here directly?</p>
                    <Link to="/dashboard" className="btn">Back to Dashboard</Link>
                </div>
            </div>
        );
    }
    
    const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100) : 0;
    
    // Determine feedback based on percentage
    let feedbackClass = '';
    let feedbackMessage = '';
    
    if (percentage >= 80) {
        feedbackClass = 'excellent';
        feedbackMessage = 'Excellent! You have mastered this quiz!';
    } else if (percentage >= 60) {
        feedbackClass = 'good';
        feedbackMessage = 'Good job! Keep learning to improve your score!';
    } else {
        feedbackClass = 'needs-improvement';
        feedbackMessage = 'Keep practicing! You can improve with more study.';
    }
    
    // Animate the progress circle on component mount
    useEffect(() => {
        const timer = setTimeout(() => {
            // Start animation after a small delay
            const interval = setInterval(() => {
                setAnimatedPercentage(prev => {
                    if (prev >= percentage) {
                        clearInterval(interval);
                        return percentage;
                    }
                    return prev + 1;
                });
            }, 15);
            
            return () => clearInterval(interval);
        }, 500);
        
        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <div className="results-container">
            <div className="score-card">
                <h1>Quiz Results</h1>
                
                <div className="score-visual">
                    <div 
                        className="circular-progress"
                        style={{
                            background: `conic-gradient(
                                var(--${feedbackClass === 'excellent' ? 'primary' : feedbackClass === 'good' ? 'success' : 'warning'}) 
                                0%, 
                                var(--${feedbackClass === 'excellent' ? 'primary' : feedbackClass === 'good' ? 'success' : 'warning'}) 
                                ${animatedPercentage}%, 
                                var(--gray) ${animatedPercentage}%, 
                                var(--gray) 100%
                            )`
                        }}
                    >
                        <div className="progress-value">
                            <span className="value">{Math.round(animatedPercentage)}%</span>
                        </div>
                    </div>
                </div>
                
                <div className="score-details">
                    <div className="score-display">
                        {score} / {totalQuestions}
                    </div>
                    <p className={`feedback ${feedbackClass}`}>
                        {feedbackMessage}
                    </p>
                </div>
                
                <div className="score-actions">
                    <button 
                        onClick={() => navigate(`/quiz/${quizId}/take`)} 
                        className="btn btn-outline"
                    >
                        Retake Quiz
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="btn"
                    >
                        Back to Dashboard
                    </button>
                </div>
                
                {/* Confetti appears for high scores */}
                {percentage >= 80 && (
                    <div className="confetti-container">
                        {Array(20).fill().map((_, i) => (
                            <div 
                                key={i}
                                className="confetti"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
                                }}
                            ></div>
                        ))}
                    </div>
                )}
            </div>
            
            <style jsx>{`
                .results-container {
                    max-width: 600px;
                    margin: 2rem auto;
                    padding: 1rem;
                }
                
                .score-card {
                    background: white;
                    border-radius: var(--border-radius-lg);
                    box-shadow: var(--shadow-lg);
                    padding: 2rem;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                
                .score-visual {
                    margin: 2rem auto;
                }
                
                .circular-progress {
                    position: relative;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .circular-progress::before {
                    content: '';
                    position: absolute;
                    width: 160px;
                    height: 160px;
                    border-radius: 50%;
                    background: white;
                }
                
                .progress-value {
                    position: relative;
                    z-index: 1;
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--dark);
                }
                
                .score-details {
                    margin-bottom: 2rem;
                }
                
                .score-display {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }
                
                .feedback {
                    font-size: 1.25rem;
                    font-weight: 600;
                }
                
                .feedback.excellent {
                    color: var(--primary);
                }
                
                .feedback.good {
                    color: var(--success);
                }
                
                .feedback.needs-improvement {
                    color: var(--warning);
                }
                
                .score-actions {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 2rem;
                }
                
                /* Confetti animation */
                .confetti-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    overflow: hidden;
                }
                
                .confetti {
                    position: absolute;
                    top: -10px;
                    width: 10px;
                    height: 20px;
                    opacity: 0;
                    transform-origin: 50% 0;
                    animation: confetti-fall 3s ease-in-out forwards;
                }
                
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                
                @media (max-width: 768px) {
                    .circular-progress {
                        width: 150px;
                        height: 150px;
                    }
                    
                    .circular-progress::before {
                        width: 120px;
                        height: 120px;
                    }
                    
                    .progress-value {
                        font-size: 2rem;
                    }
                    
                    .score-actions {
                        flex-direction: column;
                    }
                    
                    .score-actions button {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}

export default ResultsPage;