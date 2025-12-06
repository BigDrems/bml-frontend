import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import Register from './Register';
import { registerUser, loginUser } from '../../api/auth';
import { auth } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';

export default function AuthPage() {
  const { user } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);

  // Mutation for registration
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      alert('Registration successful! Please sign in.');
      setIsSignIn(true);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
      alert(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
  });

  // Mutation for login (backend verification)
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      alert('Login successful!');
      // Here you would typically store the user data or redirect
    },
    onError: (error) => {
      console.error('Login failed:', error);
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  });

  const handleSignIn = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      
      const idToken = await userCredential.user.getIdToken();
      
      loginMutation.mutate(idToken);
    } catch (error) {
      console.error("Firebase Sign In Error", error);
      alert(`Firebase Sign In Failed: ${error.message}`);
    }
  };

  const handleRegister = (data) => {
    // Call the register mutation
    registerMutation.mutate({
      email: data.email,
      password: data.password,
      name: data.name
    });
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return isSignIn ? (
    <SignIn 
      onToggleMode={() => setIsSignIn(false)} 
      onSubmit={handleSignIn}
    />
  ) : (
    <Register 
      onToggleMode={() => setIsSignIn(true)} 
      onSubmit={handleRegister}
    />
  );
}