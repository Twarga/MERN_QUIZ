// src/services/quizService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/quizzes/';

// Create axios instance with defaults
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to attach token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Create a new quiz
const createQuiz = async (title, description) => {
    try {
        return await api.post('', { title, description });
    } catch (error) {
        console.error("Create quiz error:", error.response?.data || error.message);
        throw error;
    }
};

// Get all quizzes
const getAllQuizzes = async () => {
    try {
        return await api.get('');
    } catch (error) {
        console.error("Get all quizzes error:", error.response?.data || error.message);
        throw error;
    }
};

// Get a single quiz by ID (including questions)
const getQuizById = async (quizId) => {
    try {
        return await api.get(`${quizId}`);
    } catch (error) {
        console.error(`Get quiz ${quizId} error:`, error.response?.data || error.message);
        throw error;
    }
};

// Add a question to a specific quiz
const addQuestion = async (quizId, questionData) => {
    try {
        return await api.post(`${quizId}/questions`, questionData);
    } catch (error) {
        console.error("Add question error:", error.response?.data || error.message);
        throw error;
    }
};

// Submit quiz answers
const submitQuiz = async (quizId, answers) => {
    try {
        return await api.post(`${quizId}/submit`, { answers });
    } catch (error) {
        console.error("Submit quiz error:", error.response?.data || error.message);
        throw error;
    }
};

const quizService = {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    addQuestion,
    submitQuiz,
};

export default quizService;