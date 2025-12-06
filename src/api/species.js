import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get all species with optional filters
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>}
 */
export const getAllSpecies = async (params = {}) => {
  const response = await axios.get(`${API_URL}/species`, { params });
  return response.data;
};

/**
 * Get a single species by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export const getSpeciesById = async (id) => {
  const response = await axios.get(`${API_URL}/species/${id}`);
  return response.data;
};

/**
 * Get related species by type
 * @param {string} type - Species type (bird, mammal, etc.)
 * @param {string} excludeId - ID to exclude from results
 * @param {number} limit - Number of results
 * @returns {Promise<Array>}
 */
export const getRelatedSpecies = async (type, excludeId, limit = 4) => {
  const response = await axios.get(`${API_URL}/species`, {
    params: {
      speciesType: type,
      limit
    }
  });
  // Filter out the current species
  return response.data.filter(s => s.id !== excludeId);
};
