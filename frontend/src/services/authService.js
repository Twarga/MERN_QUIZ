// src/services/authService.js
import axios from 'axios';

// Define the base URL for the backend API
const API_URL = 'http://localhost:5000/api/auth/';

// Create axios instance with defaults
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to attach token to protected requests
api.interceptors.request.use(
    (config) => {
        // Only add token for getCurrentUser endpoint
        if (config.url === 'me') {
            const token = localStorage.getItem('userToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Register user
const register = async (username, password) => {
    try {
        const response = await api.post('register', {
            username,
            password
        });
        // Store token if successful
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        throw error;
    }
};

// Login user
const login = async (username, password) => {
    try {
        const response = await api.post('login', {
            username,
            password
        });
        // Store token if successful
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
    }
};

// Logout user
const logout = () => {
    localStorage.removeItem('userToken');
};

// Get current user data (requires token)
const getCurrentUser = async () => {
    try {
        return await api.get('me');
    } catch (error) {
        console.error("Get current user error:", error.response?.data || error.message);
        throw error;
    }
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default authService;