import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import PlaceholderPage from './pages/PlaceholderPage';
import UsersPage from './pages/admin/UsersPage';
import ConfiguracionPage from './pages/admin/ConfiguracionPage';
import SystemsPage from './pages/admin/SystemsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/:section" element={<PlaceholderPage />} />
          <Route path="/dashboard/admin/usuarios" element={<UsersPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/dashboard/configuracion/*" element={<ConfiguracionPage />} />
          <Route path="/dashboard/configuracion/seguridad/sistemas" element={<SystemsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}