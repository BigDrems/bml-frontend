import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
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
      toast.success('Account created successfully!', {
        description: 'Please sign in to continue.',
        duration: 4000,
      });
      setIsSignIn(true);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unable to create account';
      toast.error('Registration Failed', {
        description: errorMessage,
        duration: 5000,
      });
    }
  });

  // Mutation for login (backend verification)
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success('Welcome back!', {
        description: 'You have successfully signed in.',
        duration: 3000,
      });
      // Here you would typically store the user data or redirect
    },
    onError: (error) => {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Invalid credentials';
      toast.error('Sign In Failed', {
        description: errorMessage,
        duration: 5000,
      });
    }
  });

  const handleSignIn = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      
      const idToken = await userCredential.user.getIdToken();
      
      loginMutation.mutate(idToken);
    } catch (error) {
      console.error("Firebase Sign In Error", error);
      let errorMessage = 'Unable to sign in. Please try again.';
      
      // Provide user-friendly error messages
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      toast.error('Authentication Failed', {
        description: errorMessage,
        duration: 5000,
      });
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