// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

// Create Context object
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // To handle initial auth check
    const [token, setToken] = useState(localStorage.getItem('userToken') || null);

    useEffect(() => {
        const verifyUser = async () => {
            const storedToken = localStorage.getItem('userToken');
            if (storedToken) {
                setToken(storedToken);
                try {
                    // Verify token with backend and get user data
                    const response = await authService.getCurrentUser(storedToken);
                    setCurrentUser(response.data.data); // Assuming backend returns { success: true, data: user }
                } catch (error) {
                    console.error("Token verification failed:", error);
                    // Token is invalid or expired, clear it
                    localStorage.removeItem('userToken');
                    setToken(null);
                    setCurrentUser(null);
                }
            }
            setLoading(false); // Finished initial check
        };

        verifyUser();
    }, []); // Run only once on mount

    const login = async (username, password) => {
        try {
            const data = await authService.login(username, password);
            setToken(data.token); // Token is already saved to localStorage by authService.login
            // Fetch user data after successful login
            const response = await authService.getCurrentUser(data.token);
            setCurrentUser(response.data.data);
            return true; // Indicate success
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Rethrow error to be caught in component
        }
    };

    const register = async (username, password) => {
         try {
            const data = await authService.register(username, password);
            setToken(data.token); // Token is saved to localStorage
            localStorage.setItem('userToken', data.token); // Ensure it's set
            // Fetch user data after successful registration
            const response = await authService.getCurrentUser(data.token);
            setCurrentUser(response.data.data);
            return true; // Indicate success
        } catch (error) {
            console.error("Registration failed:", error);
            throw error; // Rethrow error
        }
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
        setToken(null);
    };

    const value = {
        currentUser,
        token,
        loading, // Provide loading state
        login,
        register,
        logout,
    };

    // Don't render children until loading is false to prevent flash of incorrect content
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
