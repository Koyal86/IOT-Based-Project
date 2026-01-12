import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalAuth } from '@/context/LocalAuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useLocalAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;