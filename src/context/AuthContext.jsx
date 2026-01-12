import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseReady } from '@/config/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isFirebaseReady || !auth) {
      console.warn("Firebase is not configured correctly. Auth features will be disabled.");
      setError("Firebase configuration is missing. Please check your .env file.");
      setLoading(false);
      return;
    }

    let unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              setUserProfile(userDoc.data());
            }
          } catch (err) {
            console.error('Error fetching user profile:', err);
            setError(err.message);
          }
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      });
    } catch (err) {
      console.error("Error initializing auth listener:", err);
      setError("Failed to initialize authentication.");
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signup = async (email, password, userData) => {
    if (!isFirebaseReady || !auth) {
      return { success: false, error: "Firebase is not configured." };
    }

    try {
      setError(null);
      setLoading(true);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName: userData.fullName,
        companyName: userData.companyName,
        registrationNumber: userData.registrationNumber,
        industryType: userData.industryType,
        email: userData.email,
        phone: userData.phone,
        createdAt: new Date().toISOString()
      });

      setUserProfile(userData);
      return { success: true };
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    if (!isFirebaseReady || !auth) {
      return { success: false, error: "Firebase is not configured." };
    }

    try {
      setError(null);
      setLoading(true);
      
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (!isFirebaseReady || !auth) {
      return { success: false, error: "Firebase is not configured." };
    }

    try {
      setError(null);
      await signOut(auth);
      setUserProfile(null);
      return { success: true };
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const resetPassword = async (email) => {
    if (!isFirebaseReady || !auth) {
      return { success: false, error: "Firebase is not configured." };
    }

    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    signup,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};