// src/pages/AddQuestionsPage.jsx
import React, { useState, useEffect } from 'react';
import quizService from '../services/quizService';
import { useParams, useNavigate, Link } from 'react-router-dom';

function AddQuestionsPage() {
    const { quizId } = useParams(); // Get quizId from URL parameters
    const navigate = useNavigate();

    const [quizTitle, setQuizTitle] = useState(''); // To display quiz title
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']); // Start with 4 empty options
    const [correctAnswer, setCorrectAnswer] = useState(''); // Store the text of the correct answer
    const [questionsAdded, setQuestionsAdded] = useState([]); // Keep track of added questions
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchingQuiz, setFetchingQuiz] = useState(true);

     // Fetch quiz details (like title) when component mounts
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await quizService.getQuizById(quizId);
                setQuizTitle(response.data.data.title);
                 // Set initially added questions if any (useful if returning to this page)
                setQuestionsAdded(response.data.data.questions || []);
            } catch (err) {
                console.error("Error fetching quiz:", err);
                setError('Failed to load quiz details. Does the quiz exist?');
                // Optional: Redirect if quiz not found or not authorized
                // navigate('/dashboard');
            } finally {
                setFetchingQuiz(false);
            }
        };
        fetchQuiz();
    }, [quizId]); // Dependency array includes quizId


    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
         // If the changed option was the selected correct answer, update correctAnswer state
        if (options[index] === correctAnswer) {
            setCorrectAnswer(value);
        }
    };

    const handleCorrectAnswerChange = (e) => {
        setCorrectAnswer(e.target.value);
    };

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        setError('');

        // Basic Validation
        const filledOptions = options.filter(opt => opt.trim() !== '');
        if (questionText.trim() === '' || filledOptions.length < 2 || correctAnswer.trim() === '') {
            setError('Please fill in the question, at least two options, and select the correct answer.');
            return;
        }
         if (!filledOptions.includes(correctAnswer)) {
            setError('The correct answer must be one of the provided options.');
            return;
        }

        setLoading(true);

        const questionData = {
            questionText,
            options: filledOptions, // Only send non-empty options
            correctAnswer
        };

        try {
            const response = await quizService.addQuestion(quizId, questionData);
            // Update the list of added questions shown on the page
            setQuestionsAdded(response.data.data.questions); // Assuming backend returns updated quiz
            // Clear the form for the next question
            setQuestionText('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
            setError(''); // Clear previous errors
        } catch (err) {
            console.error("Add Question Error:", err);
            const message = err.response?.data?.message || 'Failed to add question.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

     if (fetchingQuiz) return <div>Loading Quiz Details...</div>;
     if (error && !quizTitle) return <div style={{ color: 'red' }}>{error} <Link to="/dashboard">Go to Dashboard</Link></div>; // Show error if quiz loading failed


    return (
        <div>
            <h2>Add Questions to Quiz: {quizTitle}</h2>

            {/* Display Already Added Questions */}
            {questionsAdded.length > 0 && (
                 <div style={{ marginBottom: '20px', border: '1px solid #eee', padding: '10px' }}>
                    <h3>Questions Added ({questionsAdded.length}):</h3>
                    <ul>
                        {questionsAdded.map((q, index) => (
                            <li key={index}>{index + 1}. {q.questionText}</li>
                        ))}
                    </ul>
                 </div>
            )}

            {/* Form to Add New Question */}
            <h3>Add New Question</h3>
             {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleAddQuestion}>
                <div>
                    <label htmlFor="questionText">Question:</label>
                    <input
                        type="text"
                        id="questionText"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        required
                    />
                </div>

                {/* Options Inputs */}
                <div>
                    <label>Options:</label>
                    {options.map((option, index) => (
                         <div key={index} style={{ margin: '5px 0' }}>
                            <input
                                type="text"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                         </div>
                    ))}
                     {/* Basic validation hint */}
                     {options.filter(opt => opt.trim() !== '').length < 2 && <small> (At least 2 options required)</small>}
                </div>

                 {/* Correct Answer Selection */}
                <div>
                    <label htmlFor="correctAnswer">Correct Answer:</label>
                    <select
                        id="correctAnswer"
                        value={correctAnswer}
                        onChange={handleCorrectAnswerChange}
                        required
                        disabled={options.filter(opt => opt.trim() !== '').length === 0} // Disable if no options yet
                    >
                        <option value="" disabled>-- Select Correct Answer --</option>
                        {options
                            .filter(opt => opt.trim() !== '') // Only show non-empty options
                            .map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                         ))}
                    </select>
                     {/* Basic validation hint */}
                     {correctAnswer.trim() === '' && options.filter(opt => opt.trim() !== '').length > 0 && <small> (Required)</small>}
                </div>


                <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
                    {loading ? 'Adding...' : 'Add This Question'}
                </button>
            </form>

            <div style={{ marginTop: '20px' }}>
                 <Link to="/dashboard">Done Adding Questions (Go to Dashboard)</Link>
            </div>
        </div>
    );
}

export default AddQuestionsPage;