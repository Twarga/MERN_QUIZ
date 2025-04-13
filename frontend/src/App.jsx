import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

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

// Import components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div className="spinner"></div>;
    }

    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <div className="container">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Protected Routes */}
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
            </main>
            <footer className="footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Quiz Master. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;