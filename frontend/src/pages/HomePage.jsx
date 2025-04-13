import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h2>Welcome to the Quiz App!</h2>
      <p>Test your knowledge or create your own quizzes.</p>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
      {/* Later, add list of public quizzes maybe */}
    </div>
  );
}

export default HomePage;