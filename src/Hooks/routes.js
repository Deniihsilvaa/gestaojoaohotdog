// src/Hooks/routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Caixa from '../pages/caixa';
import Home from '../pages/Home';
import ContasPagar from '../pages/contasapagar';
import Login from '../pages/login';
import PDefaut from '../pages/PDefaut';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/PDefaut" element={<PDefaut />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/caixa" element={<PrivateRoute><Caixa /></PrivateRoute>} />
        <Route path="/contasapagar" element={<PrivateRoute><ContasPagar /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/PDefaut" replace />} /> {/* Redireciona para login se a rota não existir */}
    </Routes>
);

export default AppRoutes;
