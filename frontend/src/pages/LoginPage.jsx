import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(username, password);
            navigate('/dashboard');
        } catch (err) {
            console.error("Login Error:", err);
            const message = err.response?.data?.message || 'Failed to log in. Please check your credentials.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Welcome Back!</h1>
                    <p>Sign in to your Quiz Master account</p>
                </div>

                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn auth-submit-btn" 
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </div>
            </div>

            <style jsx>{`
                .auth-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: calc(100vh - 180px);
                    padding: 2rem 1rem;
                }
                
                .auth-card {
                    width: 100%;
                    max-width: 450px;
                    background: white;
                    border-radius: var(--border-radius-lg);
                    box-shadow: var(--shadow-lg);
                    overflow: hidden;
                }
                
                .auth-header {
                    padding: 2rem;
                    text-align: center;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    color: white;
                }
                
                .auth-header h1 {
                    color: white;
                    margin-bottom: 0.5rem;
                }
                
                .auth-header p {
                    opacity: 0.9;
                    margin-bottom: 0;
                }
                
                .auth-form {
                    padding: 2rem;
                }
                
                .auth-submit-btn {
                    width: 100%;
                    margin-top: 1rem;
                    padding: 0.75rem;
                }
                
                .auth-footer {
                    padding: 1.5rem;
                    text-align: center;
                    border-top: 1px solid var(--gray);
                    background-color: rgba(67, 97, 238, 0.03);
                }
            `}</style>
        </div>
    );
}

export default LoginPage;