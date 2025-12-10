/**
 * Map utility functions
 */

/**
 * Event handlers for GeoJSON features
 * @param {Object} feature - GeoJSON feature
 * @param {Object} layer - Leaflet layer
 * @param {Object} styles - Object containing geoJSONStyle and highlightStyle
 */
export const createGeoJSONEventHandlers = (feature, layer, styles) => {
  const { geoJSONStyle, highlightStyle } = styles;
  
  if (feature.properties && feature.properties.name) {
    layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
  }

  layer.on({
    mouseover: (e) => {
      const layer = e.target;
      layer.setStyle(highlightStyle);
    },
    mouseout: (e) => {
      const layer = e.target;
      layer.setStyle(geoJSONStyle);
    },
  });
};

/**
 * Format date for display in marker popup
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatSightingDate = (date) => {
  if (!date) return 'Unknown date';
  
  return new Date(date).toLocaleDateString(undefined, { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

/**
 * Get image URL from sighting data with fallbacks
 * @param {Object} sighting - Sighting object
 * @param {Object} species - Species object
 * @returns {string} Image URL
 */
export const getSightingImageUrl = (sighting, species) => {
  return sighting.imageUrl || 
    (sighting.media && sighting.media.length > 0 ? sighting.media[0].url : null) ||
    species.image;
};

/**
 * Generate Unsplash fallback URL for species
 * @param {string} speciesName - Common name of the species
 * @returns {string} Unsplash URL
 */
export const getUnsplashFallback = (speciesName) => {
  return `https://source.unsplash.com/400x300/?${speciesName?.replace(' ', '+')}`;
};

export const getFullLocation = (sighting) => {
      const name = sighting.locationName?.trim();
      const muni = sighting.municipality?.trim();
      if (name && muni) return `${name}, ${muni}`;
      return name || muni || '';
};