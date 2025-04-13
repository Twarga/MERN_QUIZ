import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Check if the link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Get user's initials for the avatar
    const getUserInitials = () => {
        if (currentUser && currentUser.username) {
            return currentUser.username.charAt(0).toUpperCase();
        }
        return "U";
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to={currentUser ? "/dashboard" : "/"} className="navbar-brand">
                    Quiz Master
                </Link>
                
                <div className="navbar-nav">
                    {currentUser ? (
                        <>
                            <Link 
                                to="/dashboard" 
                                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                            >
                                Dashboard
                            </Link>
                            <Link 
                                to="/create-quiz" 
                                className={`nav-link ${isActive('/create-quiz') ? 'active' : ''}`}
                            >
                                Create Quiz
                            </Link>
                            
                            <div className="user-menu">
                                <div className="avatar">
                                    {getUserInitials()}
                                </div>
                                <span className="username">{currentUser.username}</span>
                                <button 
                                    onClick={handleLogout} 
                                    className="btn btn-outline"
                                    style={{ padding: '0.5rem 1rem' }}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className={`nav-link ${isActive('/register') ? 'active' : ''}`}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;