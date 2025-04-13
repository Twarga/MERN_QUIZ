import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login after logout
    };

    // Basic inline styles for the navbar
    const navStyle = {
        backgroundColor: '#f0f0f0',
        padding: '10px 20px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ccc'
    };

    const linkStyle = {
        margin: '0 10px',
        textDecoration: 'none',
        color: '#333'
    };

     const buttonStyle = {
        padding: '5px 10px',
        cursor: 'pointer'
    };

    return (
        <nav style={navStyle}>
            <div>
                <Link to={currentUser ? "/dashboard" : "/"} style={{...linkStyle, fontWeight: 'bold'}}>Quiz App</Link>
            </div>
            <div>
                {currentUser ? (
                    <>
                        <span style={{ marginRight: '15px' }}>Welcome, {currentUser.username}!</span>
                         <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                        <button onClick={handleLogout} style={buttonStyle}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/register" style={linkStyle}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;