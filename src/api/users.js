import axios from 'axios';
import { auth } from '@/config/firebase';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = async () => {
  let token = null;
  
  if (auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken();
    } catch (e) {
      console.error("Failed to retrieve Firebase token:", e);
    }
  }

  if (!token) {
    token = localStorage.getItem('token');
  }

  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Get all users with pagination and filtering
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.search - Search query
 * @param {string} params.role - Filter by role
 * @param {string} params.status - Filter by status
 * @returns {Promise<Object>} Paginated users data
 */
export const getUsers = async ({ page = 1, limit = 10, search = '', role = '', status = '' } = {}) => {
  try {
    const headers = await getAuthHeader();
    const params = { page, limit };
    
    if (search) params.search = search;
    if (role) params.role = role;
    if (status) params.status = status;

    const response = await axios.get(`${API_URL}/users/`, {
      headers,
      params
    });

    console.log('Users API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Get a single user by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User data
 */
export const getUserById = async (userId) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get(`${API_URL}/users/${userId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

/**
 * Update an existing user
 * @param {string} userId - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} Updated user
 */
export const updateUser = async (userId, userData) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Delete a user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteUser = async (userId) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.delete(`${API_URL}/users/${userId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

/**
 * Update user role
 * @param {string} userId - User ID
 * @param {string} role - New role
 * @returns {Promise<Object>} Updated user
 */
export const updateUserRole = async (userId, role) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.put(`${API_URL}/users/${userId}`, { role }, { headers });
    return response.data;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

/**
 * Update user status (activate/deactivate)
 * @param {string} userId - User ID
 * @param {string} status - New status (active/inactive)
 * @returns {Promise<Object>} Updated user
 */
export const updateUserStatus = async (userId, status) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.put(`${API_URL}/users/${userId}`, { status }, { headers });
    return response.data;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};
