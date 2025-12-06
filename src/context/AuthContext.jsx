import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase'; 
import { useLogin } from '../hooks/useAuth';
import LoadingScreen from '../components/ui/LoadingScreen';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { mutate: backendLogin } = useLogin();

  useEffect(() => {
    // Firebase listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in with Firebase
        const token = await firebaseUser.getIdToken();
        
        // Sync with backend
        backendLogin(token, {
            onSuccess: (response) => {
                // Handle nested user data from backend response
                const backendUser = response.user || response.data || response;
                setUser({ ...firebaseUser, ...backendUser });
                setLoading(false);
            },
            onError: () => {
                setUser(null);
                setLoading(false);
            }
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? (
        <LoadingScreen />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);