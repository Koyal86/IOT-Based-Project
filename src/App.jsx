import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // <-- Use HashRouter
import { LocalAuthProvider, useLocalAuth } from '@/context/LocalAuthContext';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';

const RedirectIfAuthenticated = ({ children }) => {
  const { currentUser, loading } = useLocalAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const RootRedirect = () => {
  const { currentUser, loading } = useLocalAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return <Navigate to={currentUser ? "/dashboard" : "/login"} replace />;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <SignUp />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

function App() {
  return (
    <LocalAuthProvider>
      <AppRoutes />
    </LocalAuthProvider>
  );
}

export default App;
