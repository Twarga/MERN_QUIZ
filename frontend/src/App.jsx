// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateQuizPage from './pages/CreateQuizPage';
import AddQuestionsPage from './pages/AddQuestionsPage';
import TakeQuizPage from './pages/TakeQuizPage';
import ResultsPage from './pages/ResultsPage';
import NotFoundPage from './pages/NotFoundPage';

// Import a basic Navbar component (optional, create later)
// import Navbar from './components/Navbar';

// We'll need AuthContext and ProtectedRoute later
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider, useAuth } from './context/AuthContext'; // Import useAuth
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; // Let's create a Navbar

function AppContent() {
    const { currentUser } = useAuth(); // Get user state for conditional rendering in Navbar etc.

    return (
      <div>
        <Navbar /> {/* Render Navbar */}
        <div style={{ padding: '20px' }}> {/* Add some padding around content */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes Wrapper */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/create-quiz" element={<CreateQuizPage />} />
                <Route path="/quiz/:quizId/add-questions" element={<AddQuestionsPage />} />
                <Route path="/quiz/:quizId/take" element={<TakeQuizPage />} />
                <Route path="/quiz/:quizId/results" element={<ResultsPage />} />
              </Route>

              {/* Catch-all Not Found Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
      </div>
    );
}


function App() {
  return (
    // <AuthProvider> {/* Wrap everything in AuthProvider later */}
      <div>
        {/* <Navbar /> */} {/* Add a navbar later */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes (will wrap later) */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
          {/* Need quiz ID for adding questions */}
          <Route path="/quiz/:quizId/add-questions" element={<AddQuestionsPage />} />
           {/* Need quiz ID for taking quiz */}
          <Route path="/quiz/:quizId/take" element={<TakeQuizPage />} />
           {/* Need submission ID or quiz ID for results? Let's use quiz ID for simplicity */}
          <Route path="/quiz/:quizId/results" element={<ResultsPage />} />


          {/* Catch-all Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    // </AuthProvider>
  );
}

export default App;
