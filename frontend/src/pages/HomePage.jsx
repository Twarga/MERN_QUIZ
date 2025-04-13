import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Quiz Master</h1>
        <p className="hero-subtitle">Test your knowledge, create challenges, and share quizzes with friends!</p>
        
        <div className="hero-actions">
          <Link to="/register" className="btn">Get Started</Link>
          <Link to="/login" className="btn btn-outline">Login</Link>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Why Choose Quiz Master?</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Create Custom Quizzes</h3>
            <p>Design your own quizzes with multiple-choice questions on any topic you like.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Track Your Progress</h3>
            <p>See your scores and improve your knowledge over time with detailed feedback.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Try Other Quizzes</h3>
            <p>Explore and take quizzes created by other users to challenge yourself.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Modern Experience</h3>
            <p>Enjoy a sleek, responsive interface that works on any device.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to test your knowledge?</h2>
        <p>Join our community of quiz enthusiasts today!</p>
        <Link to="/register" className="btn btn-large">Sign Up Now</Link>
      </div>

      <style jsx>{`
        .home-container {
          padding: 0 0 3rem;
        }
        
        .hero-section {
          text-align: center;
          padding: 4rem 1rem;
          margin-bottom: 3rem;
          background: linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(114, 9, 183, 0.1));
          border-radius: var(--border-radius-lg);
        }
        
        .hero-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, var(--primary), var(--accent));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto 2rem;
          color: var(--dark);
        }
        
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        
        .features-section {
          padding: 3rem 0;
        }
        
        .features-section h2 {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .feature-card {
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-md);
          text-align: center;
          transition: var(--transition);
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .cta-section {
          text-align: center;
          margin-top: 4rem;
          padding: 3rem;
          background: linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(114, 9, 183, 0.1));
          border-radius: var(--border-radius-lg);
        }
        
        .btn-large {
          padding: 1rem 2rem;
          font-size: 1.1rem;
          margin-top: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .hero-actions .btn {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
}

export default HomePage;