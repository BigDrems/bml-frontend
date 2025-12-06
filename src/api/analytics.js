import axios from 'axios';
import { auth } from '../config/firebase';
import { PROTECTED_AREAS } from '../data/constant/location';

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
 * Get analytics/stats for the dashboard
 * Aggregates data from species and sightings endpoints
 * @returns {Promise<Object>} Analytics data
 */
export const getAnalytics = async () => {
  try {
    const headers = await getAuthHeader();
    
    // Get current date info for monthly comparison
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).toISOString();
    
    const [speciesResponse, sightingsResponse, allSightingsResponse] = await Promise.all([
      axios.get(`${API_URL}/species`),
      axios.get(`${API_URL}/sightings`, { 
        params: { limit: 1 },
        headers 
      }),
      axios.get(`${API_URL}/sightings`, { 
        params: { limit: 10000 },
        headers
      }).catch(() => ({ data: { data: [] } }))
    ]);

    const totalSpecies = Array.isArray(speciesResponse.data) 
      ? speciesResponse.data.length 
      : speciesResponse.data?.total || 0;

    const totalObservations = sightingsResponse.data?.total || 0;
    
    const allSightings = allSightingsResponse.data?.data || [];
    
    // Calculate unique contributors
    const contributors = new Set(allSightings.map(s => s.userUid));
    
    // Calculate this month's sightings
    const thisMonthSightings = allSightings.filter(s => 
      new Date(s.observedAt || s.createdAt) >= new Date(startOfMonth)
    );
    
    // Calculate last month's sightings
    const lastMonthSightings = allSightings.filter(s => {
      const date = new Date(s.observedAt || s.createdAt);
      return date >= new Date(startOfLastMonth) && date <= new Date(endOfLastMonth);
    });
    
    // Calculate percentage changes
    const calcPercent = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100 * 10) / 10;
    };
    
    const thisMonthContributors = new Set(thisMonthSightings.map(s => s.userUid)).size;
    const lastMonthContributors = new Set(lastMonthSightings.map(s => s.userUid)).size;

    // Get protected areas count from constant data
    const protectedAreasCount = PROTECTED_AREAS.length;

    return {
      totalSpecies,
      totalObservations,
      activeContributors: contributors.size,
      protectedAreas: protectedAreasCount,
      percentages: {
        species: 0, // No historical data for species
        observations: calcPercent(thisMonthSightings.length, lastMonthSightings.length),
        contributors: calcPercent(thisMonthContributors, lastMonthContributors),
        protectedAreas: 0, // Static data, no percentage change
      }
    };
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    throw error;
  }
};
