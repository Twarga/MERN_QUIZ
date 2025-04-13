import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="error-code">404</div>
                <h1>Page Not Found</h1>
                <p>The page you are looking for doesn't exist or has been moved.</p>
                <Link to="/dashboard" className="btn">Back to Dashboard</Link>
            </div>
            
            <div className="not-found-illustration">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        fill="#4361ee" 
                        d="M47.7,-57.2C59.9,-45.3,67.2,-28.7,68.1,-12.2C69,4.4,63.6,20.9,53.5,33.8C43.4,46.7,28.5,56,11.9,60.1C-4.7,64.2,-23.1,63.1,-37.8,54.9C-52.6,46.8,-63.8,31.5,-67.4,14.4C-71,-2.8,-67,-21.8,-57.2,-36.1C-47.4,-50.4,-31.8,-60,-14.9,-61.5C2,-63,35.4,-69.1,47.7,-57.2Z" 
                        transform="translate(100 100)" 
                    />
                </svg>
                <div className="question-mark">?</div>
            </div>
            
            <style jsx>{`
                .not-found-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: calc(100vh - 180px);
                    padding: 2rem 1rem;
                    text-align: center;
                }
                
                .not-found-content {
                    max-width: 600px;
                    margin-bottom: 3rem;
                }
                
                .error-code {
                    font-size: 8rem;
                    font-weight: 800;
                    line-height: 1;
                    background: linear-gradient(45deg, var(--primary), var(--accent));
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    margin-bottom: 1rem;
                }
                
                .not-found-container h1 {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }
                
                .not-found-container p {
                    font-size: 1.2rem;
                    margin-bottom: 2rem;
                    color: var(--dark);
                    opacity: 0.8;
                }
                
                .not-found-illustration {
                    position: relative;
                    width: 200px;
                    height: 200px;
                }
                
                .question-mark {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 5rem;
                    font-weight: 700;
                    color: white;
                }
                
                @media (max-width: 768px) {
                    .error-code {
                        font-size: 6rem;
                    }
                    
                    .not-found-container h1 {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default NotFoundPage;