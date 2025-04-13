// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Updated extension to .jsx

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Optional: Show a loading spinner or placeholder while checking auth state
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    // User not logged in, redirect to login page
    // Pass the current location to redirect back after login (optional)
    // return <Navigate to="/login" state={{ from: location }} replace />;
     return <Navigate to="/login" replace />;
  }

  // User is logged in, render the child route component
  // If using <ProtectedRoute><MyComponent /></ProtectedRoute> structure:
  // return children;
  // If using <Route element={<ProtectedRoute />}> <Route ... /> </Route> structure:
  return <Outlet />;
}

export default ProtectedRoute;