import axios from 'axios';
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = async () => {
  let token = null;
  
  // Always prefer fresh token from Firebase SDK
  if (auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken();
    } catch (e) {
      console.error("Failed to retrieve Firebase token:", e);
    }
  }

  // Fallback to localStorage if SDK fails or user not found (though unlikely if logged in)
  if (!token) {
    token = localStorage.getItem('token');
  }

  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Create a new sighting
 * @param {FormData} formData - FormData object containing fields: speciesId, locationId, locationName, notes, observedAt, lat, lng, and files
 * @returns {Promise<{message: string, sighting: Object}>}
 */
export const createSighting = async (formData) => {
  const headers = await getAuthHeader();
  // Content-Type is automatically set to multipart/form-data by axios when passing FormData
  const response = await axios.post(`${API_URL}/sightings`, formData, {
    headers: {
      ...headers,
    },
  });
  return response.data;
};

/**
 * Get all sightings with pagination and filters
 * @param {Object} params - Query parameters: page, limit, status, speciesId, userUid
 * @returns {Promise<{page: number, limit: number, total: number, data: Array}>}
 */
export const getAllSightings = async (params) => {
  const headers = await getAuthHeader();
  const response = await axios.get(`${API_URL}/sightings`, { 
    params,
    headers
  });
  return response.data;
};

/**
 * Get a single sighting by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export const getSightingById = async (id) => {
  const headers = await getAuthHeader();
  const response = await axios.get(`${API_URL}/sightings/${id}`, {
    headers
  });
  return response.data;
};

/**
 * Update a sighting
 * @param {string} id 
 * @param {Object} data - Fields to update (JSON)
 * @returns {Promise<{message: string, updated: Object}>}
 */
export const updateSighting = async (id, data) => {
  const headers = await getAuthHeader();
  const response = await axios.put(`${API_URL}/sightings/${id}`, data, {
    headers
  });
  return response.data;
};

/**
 * Delete a sighting
 * @param {string} id 
 * @returns {Promise<{message: string}>}
 */
export const deleteSighting = async (id) => {
  const headers = await getAuthHeader();
  const response = await axios.delete(`${API_URL}/sightings/${id}`, {
    headers
  });
  return response.data;
};

/**
 * Verify a sighting (Expert/Admin only)
 * @param {string} id 
 * @returns {Promise<{message: string, sighting: Object}>}
 */
export const verifySighting = async (id) => {
  const headers = await getAuthHeader();
  const response = await axios.patch(`${API_URL}/sightings/${id}/verify`, {}, {
    headers
  });
  return response.data;
};

/**
 * Approve a sighting (Admin only)
 * @param {string} id 
 * @returns {Promise<{message: string, sighting: Object}>}
 */
export const approveSighting = async (id) => {
  const headers = await getAuthHeader();
  const response = await axios.patch(`${API_URL}/sightings/${id}/approve`, {}, {
    headers
  });
  return response.data;
};

/**
 * Reject a sighting (Admin only)
 * @param {string} id 
 * @param {string} reason - Reason for rejection
 * @returns {Promise<{message: string, sighting: Object}>}
 */
export const rejectSighting = async (id, reason) => {
  const headers = await getAuthHeader();
  const response = await axios.patch(`${API_URL}/sightings/${id}/reject`, 
    { reason }, 
    { headers }
  );
  return response.data;
};

/**
 * Get sightings as GeoJSON (optionally filtered by species or status)
 * @param {Object} params - Query parameters: speciesId, status
 * @returns {Promise<Object>} GeoJSON FeatureCollection
 */
export const getSightingsGeoJSON = async (params = {}) => {
  const headers = await getAuthHeader();
  const response = await axios.get(`${API_URL}/sightings/geojson`, {
    params,
    headers
  });
  return response.data;
};

/**
 * Get nearby sightings within a radius
 * @param {Object} params - Query parameters: lat, lng, radius (in meters, default 5000)
 * @returns {Promise<{center: Object, radiusMeters: number, total: number, data: Array}>}
 */
export const getNearbySightings = async (params) => {
  const headers = await getAuthHeader();
  const response = await axios.get(`${API_URL}/sightings/nearby`, {
    params,
    headers
  });
  return response.data;
};

/**
 * Get sightings within a bounding box
 * @param {Object} params - Query parameters: minLat, minLng, maxLat, maxLng
 * @returns {Promise<{total: number, data: Array}>}
 */
export const getSightingsInBounds = async (params) => {
  const headers = await getAuthHeader();
  const response = await axios.get(`${API_URL}/sightings/bounds`, {
    params,
    headers
  });
  return response.data;
};
