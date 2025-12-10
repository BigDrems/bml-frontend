import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Register a new user
 * @param {Object} data - { email, password, name }
 */
export const registerUser = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Login user with Firebase ID Token
 * @param {string} idToken - Firebase ID Token
 */
export const loginUser = async (idToken) => {
  try {
    const response = await api.post('/auth/login', { idToken });
    return response.data;
  } catch (error) {
    throw error;
  }
};
