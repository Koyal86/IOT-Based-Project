import React, { createContext, useContext, useState, useEffect } from 'react';

const LocalAuthContext = createContext({});

export const useLocalAuth = () => {
  const context = useContext(LocalAuthContext);
  if (!context) {
    throw new Error('useLocalAuth must be used within a LocalAuthProvider');
  }
  return context;
};

export const LocalAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for persisted session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          // Get existing users
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          
          // Check for duplicate email
          if (users.some(u => u.email === userData.email)) {
            resolve({ success: false, error: "Email already registered" });
            return;
          }

          // Create new user object (remove password from stored session data ideally, but for mock keep it simple)
          const newUser = {
            uid: `user_${Date.now()}`,
            ...userData,
            createdAt: new Date().toISOString()
          };

          // Save to users list
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));

          // Set as current user (auto login)
          const sessionUser = { ...newUser };
          delete sessionUser.password; // Don't store password in session
          
          localStorage.setItem('currentUser', JSON.stringify(sessionUser));
          setCurrentUser(sessionUser);

          resolve({ success: true });
        } catch (error) {
          console.error("Signup error:", error);
          resolve({ success: false, error: "Failed to create account" });
        }
      }, 800); // Simulate network delay
    });
  };

  const login = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const user = users.find(u => u.email === email && u.password === password);

          if (user) {
            const sessionUser = { ...user };
            delete sessionUser.password;
            
            localStorage.setItem('currentUser', JSON.stringify(sessionUser));
            setCurrentUser(sessionUser);
            resolve({ success: true });
          } else {
            resolve({ success: false, error: "Invalid email or password" });
          }
        } catch (error) {
          console.error("Login error:", error);
          resolve({ success: false, error: "Login failed" });
        }
      }, 800); // Simulate network delay
    });
  };

  const logout = async () => {
    return new Promise((resolve) => {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      resolve({ success: true });
    });
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout
  };

  return (
    <LocalAuthContext.Provider value={value}>
      {children}
    </LocalAuthContext.Provider>
  );
};