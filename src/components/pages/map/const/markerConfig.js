/**
 * Marker configuration constants
 */

// Cluster icon size thresholds
export const CLUSTER_THRESHOLDS = {
  SMALL: { min: 0, max: 10, size: 36 },
  MEDIUM: { min: 10, max: 50, size: 44 },
  LARGE: { min: 50, max: Infinity, size: 52 },
};

// Cluster configuration
export const CLUSTER_CONFIG = {
  maxClusterRadius: 60,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16,
};

// Sighting marker configuration
export const SIGHTING_MARKER_CONFIG = {
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
};

// Popup configuration
export const POPUP_CONFIG = {
  minWidth: 280,
  maxWidth: 280,
  autoPanPadding: [50, 50],
  autoPan: true,
};

// Default fallback image
export const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=400&auto=format&fit=crop';
