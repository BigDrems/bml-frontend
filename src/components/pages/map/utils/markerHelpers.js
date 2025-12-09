import L from 'leaflet';
import { SPECIES_LIST } from '@/data/constant/species';
import { CLUSTER_THRESHOLDS, SIGHTING_MARKER_CONFIG } from '../const';

/**
 * Get color for a species type based on SPECIES_LIST
 * @param {string} type - Species type (e.g., 'bird', 'mammal')
 * @returns {string} Hex color code
 */
export const getSightingSpeciesColor = (type) => {
  const species = SPECIES_LIST.find(s => s.id === type?.toLowerCase());
  return species ? species.color : '#7f8c8d';
};

/**
 * Create a custom icon for a sighting marker
 * @param {string} type - Species type
 * @returns {L.DivIcon} Leaflet DivIcon
 */
export const createSightingIcon = (type) => {
  const color = getSightingSpeciesColor(type);
  
  return L.divIcon({
    className: 'custom-sighting-marker',
    html: `<div style="filter: drop-shadow(0 3px 3px rgba(0,0,0,0.4));">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="${color}">
        <path d="M12 0c-4.418 0-8 3.582-8 8 0 5.018 7.2 15.8 8 16 .8-.2 8-10.982 8-16 0-4.418-3.582-8-8-8z" stroke="white" stroke-width="1.5"/>
        <circle cx="12" cy="8" r="3.5" fill="white"/>
      </svg>
    </div>`,
    iconSize: SIGHTING_MARKER_CONFIG.iconSize,
    iconAnchor: SIGHTING_MARKER_CONFIG.iconAnchor,
    popupAnchor: SIGHTING_MARKER_CONFIG.popupAnchor
  });
};

/**
 * Create a custom cluster icon
 * @param {Object} cluster - Leaflet cluster object
 * @returns {L.DivIcon} Leaflet DivIcon
 */
export const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount();
  let size = 'small';
  let dimensions = CLUSTER_THRESHOLDS.SMALL.size;
  
  if (count >= CLUSTER_THRESHOLDS.MEDIUM.min && count < CLUSTER_THRESHOLDS.MEDIUM.max) {
    size = 'medium';
    dimensions = CLUSTER_THRESHOLDS.MEDIUM.size;
  } else if (count >= CLUSTER_THRESHOLDS.LARGE.min) {
    size = 'large';
    dimensions = CLUSTER_THRESHOLDS.LARGE.size;
  }
  
  return L.divIcon({
    html: `<div class="cluster-icon cluster-${size}">
      <span>${count}</span>
    </div>`,
    className: 'custom-cluster-marker',
    iconSize: L.point(dimensions, dimensions, true),
  });
};
