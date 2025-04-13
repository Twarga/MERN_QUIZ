// src/services/quizService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/quizzes/'; // Backend quiz endpoint

// Helper to get the auth token
const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create a new quiz
const createQuiz = (title, description) => {
    return axios.post(API_URL, { title, description }, { headers: getAuthHeaders() });
};

// Get all quizzes
const getAllQuizzes = () => {
    // Decide if this needs auth based on backend route config
    // return axios.get(API_URL, { headers: getAuthHeaders() }); // If protected
    return axios.get(API_URL); // If public
};

// Get a single quiz by ID (including questions)
const getQuizById = (quizId) => {
    return axios.get(API_URL + quizId, { headers: getAuthHeaders() });
};

// Add a question to a specific quiz
const addQuestion = (quizId, questionData) => {
    // questionData = { questionText, options, correctAnswer }
    return axios.post(`${API_URL}${quizId}/questions`, questionData, { headers: getAuthHeaders() });
};

// Submit quiz answers
const submitQuiz = (quizId, answers) => {
    // answers = [{ questionIndex: number, selectedAnswer: string }]
    return axios.post(`${API_URL}${quizId}/submit`, { answers }, { headers: getAuthHeaders() });
};


const quizService = {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    addQuestion,
    submitQuiz,
};

export default quizService;