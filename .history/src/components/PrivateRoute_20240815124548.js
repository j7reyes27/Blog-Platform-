// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check if the user is authenticated

    return token ? children : <Navigate to="/sign-in" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
