/**
 * Location utility functions
 */

/**
 * Ray-casting algorithm to check if point is in polygon
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {Object} polygon - GeoJSON polygon geometry
 * @returns {boolean} True if point is inside polygon
 */
export const isPointInPolygon = (lat, lng, polygon) => {
  const x = lng, y = lat;
  let inside = false;
  
  // Handle MultiPolygon and Polygon
  const polygons = polygon.type === 'MultiPolygon' 
    ? polygon.coordinates 
    : [polygon.coordinates];

  for (const poly of polygons) {
    // For each polygon, the first ring is the outer boundary
    const vs = polygon.type === 'MultiPolygon' ? poly[0] : poly[0];
    
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0], yi = vs[i][1];
      const xj = vs[j][0], yj = vs[j][1];
      
      const intersect = ((yi > y) !== (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    if (inside) return true; // If inside any polygon part
  }
  
  return inside;
};

/**
 * Check if coordinates are within a GeoJSON feature collection
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {Object} geoJSON - GeoJSON feature collection
 * @returns {boolean} True if point is inside any feature
 */
export const isPointInGeoJSON = (lat, lng, geoJSON) => {
  return geoJSON.features.some(feature => 
    isPointInPolygon(lat, lng, feature.geometry)
  );
};

/**
 * Format coordinates for display
 * @param {number} coord - Coordinate value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted coordinate
 */
export const formatCoordinate = (coord, decimals = 6) => {
  return coord ? coord.toFixed(decimals) : '';
};
