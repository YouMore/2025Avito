import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { message } from 'antd';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    message.warning('Доступ запрещен. Пожалуйста, авторизуйтесь. Подойдет любой логин и пароль');
    return <Navigate to="/list" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;