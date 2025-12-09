import axios from 'axios';
import type { Species, CreateSpeciesInput, UpdateSpeciesInput } from '../types/species';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get all species with optional filters
 */
export const getAllSpecies = async (params = {}): Promise<Species[]> => {
  const response = await axios.get(`${API_URL}/species`, { params });
  return response.data;
};

/**
 * Get a single species by ID
 */
export const getSpeciesById = async (id: string): Promise<Species> => {
  const response = await axios.get(`${API_URL}/species/${id}`);
  return response.data;
};

/**
 * Get related species by type
 */
export const getRelatedSpecies = async (type: string, excludeId: string, limit = 4): Promise<Species[]> => {
  const response = await axios.get(`${API_URL}/species`, {
    params: {
      speciesType: type,
      limit
    }
  });
  // Filter out the current species
  return response.data.filter((s: Species) => s.id !== excludeId);
};

/**
 * Create a new species (Admin only)
 */
export const createSpecies = async (data: CreateSpeciesInput): Promise<{ message: string; species: Species }> => {
  const response = await axios.post(`${API_URL}/species`, data);
  return response.data;
};

/**
 * Update an existing species (Admin only)
 */
export const updateSpecies = async (id: string, data: UpdateSpeciesInput): Promise<{ message: string; updated: Species }> => {
  const response = await axios.put(`${API_URL}/species/${id}`, data);
  return response.data;
};

/**
 * Delete a species (Admin only)
 */
export const deleteSpecies = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${API_URL}/species/${id}`);
  return response.data;
};
