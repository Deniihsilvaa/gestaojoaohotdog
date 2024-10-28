// src/App.js
import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './Hooks/routes';
import { isAuthenticated } from './services/authService';
import './styles/App.css';

function App() {
    const location = useLocation();
    const isLoginRoute = location.pathname === '/';
    const isErroRoute = location.pathname === '/PDefaut';

    return (
        <div className='card'>
            {isAuthenticated() && !isLoginRoute && !isErroRoute&& <Navbar />}
            <AppRoutes />
        </div>
    );
}

// Componente Wrapper para envolver o App com o Router
const WrappedApp = () => (
    <Router>
        <App />
    </Router>
);

export default WrappedApp;
