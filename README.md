# Quiz Master - Interactive Quiz Application

<div align="center">
  
![Quiz Master Logo](https://via.placeholder.com/150x150/4361ee/ffffff?text=QM)

### Modern, responsive quiz application built with the MERN stack

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

</div>

## 📋 Overview

Quiz Master is a full-stack web application that allows users to create, share, and take quizzes on any topic. With a sleek, modern UI and intuitive UX, the platform makes learning interactive and engaging.

### ✨ Key Features

- **User Authentication** - Secure login and registration system
- **Create Custom Quizzes** - Design quizzes with custom questions and multiple-choice answers
- **Interactive Quiz Experience** - Take quizzes with real-time feedback and progress tracking
- **Visual Results** - See your scores with beautiful visual representations
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## 🖼️ Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400/f8f9fa/4361ee?text=Dashboard+View" alt="Dashboard Screenshot" width="80%">
  <p><em>User dashboard with quiz management</em></p>
  
  <img src="https://via.placeholder.com/800x400/f8f9fa/4361ee?text=Interactive+Quiz+Experience" alt="Quiz Experience Screenshot" width="80%">
  <p><em>Engaging quiz interface with progress tracking and visual feedback</em></p>
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/twarga/quiz-master.git
   cd quiz-master
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=30d
   ```

3. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

4. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

## 🏗️ Tech Stack

### Frontend
- **React** - UI library for building component-based interfaces
- **React Router** - For handling navigation between different views
- **Axios** - Promise-based HTTP client for API requests
- **CSS Variables** - For consistent styling and theming

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework for Node.js
- **MongoDB** - NoSQL database for storing quiz and user data
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for secure user authentication
- **bcrypt** - For password hashing and security

## 🧩 Project Structure

```
quiz-master/
├── backend/                # Backend Express API
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── server.js           # Entry point
│
├── frontend/               # React frontend
│   ├── public/             # Static files
│   └── src/
│       ├── components/     # Reusable components
│       ├── context/        # React context for state management
│       ├── pages/          # Page components
│       ├── services/       # API service functions
│       ├── App.jsx         # Main app component
│       └── index.css       # Global styles
│
└── package.json           # Root package.json for scripts
```

## 📝 Features in Detail

### Authentication
- User registration with username and password
- Secure login with JWT token authentication
- Protected routes for authenticated users

### Quiz Creation & Management
- Create quizzes with title and description
- Add multiple-choice questions with customizable options
- Mark correct answers for automatic grading

### Quiz Taking
- Interactive interface with progress tracking
- Animated transitions between questions
- Submit answers for immediate feedback
- Visual representation of scores with animated progress circles

## 🔄 API Routes

### Auth Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and get token
- `GET /api/auth/me` - Get current user data (protected)

### Quiz Routes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get a specific quiz
- `POST /api/quizzes` - Create a new quiz (protected)
- `POST /api/quizzes/:id/questions` - Add a question to a quiz (protected)
- `POST /api/quizzes/:id/submit` - Submit quiz answers (protected)

## 📚 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

Project Link: [https://github.com/twarga/quiz-master](https://github.com/twarga/quiz-master)

---

<div align="center">
  
Made with ❤️ by Youness Touzani (twarga)

</div>