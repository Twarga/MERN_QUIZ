// src/services/authService.js
import axios from 'axios';

// Define the base URL for the backend API
// Make sure the backend server is running!
const API_URL = 'http://localhost:5000/api/auth/'; // Adjust port if needed

// Register user
const register = (username, password) => {
    return axios.post(API_URL + 'register', {
        username,
        password,
    });
};

// Login user
const login = (username, password) => {
    return axios.post(API_URL + 'login', {
            username,
            password,
        })
        .then((response) => {
            // If login is successful, store the token
            if (response.data.token) {
                localStorage.setItem('userToken', response.data.token); // Store token
            }
            return response.data; // Return the response data (including token)
        });
};

// Logout user
const logout = () => {
    localStorage.removeItem('userToken'); // Remove token
    // Optionally: make an API call to invalidate the token on the server side
};

// Get current user data (requires token)
const getCurrentUser = (token) => {
    return axios.get(API_URL + 'me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;