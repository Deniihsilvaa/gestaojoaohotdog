// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/authService';

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
