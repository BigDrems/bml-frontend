import {useMutation, useQueryClient} from '@tanstack/react-query';
import { registerUser, loginUser } from '@/api/auth';

export const useRegister = () => {
    return useMutation({
        mutationFn: (userData) => registerUser(userData),
        onSuccess: (data) => {
        },
        onError: (error) => {
            console.error('Registration failed:', error);
        }
    });
}
export const useLogin = () => {
  return useMutation({
    mutationFn: (idToken) => loginUser(idToken),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
    onError: (error) => {
      console.error('Login failed:', error.response?.data?.message || error.message);
    },
  });
};