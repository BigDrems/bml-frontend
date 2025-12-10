/**
 * Featured sightings utility functions
 */

/**
 * Format location from sighting data
 * @param {Object} sighting - Sighting object
 * @returns {string} Formatted location string
 */
export const formatLocation = (sighting) => {
  const parts = [];
  
  if (sighting.locationName) {
    parts.push(sighting.locationName);
  }
  
  // Add town/municipality if available
  if (sighting.location?.municipality || sighting.location?.town) {
    parts.push(sighting.location.municipality || sighting.location.town);
  }
  
  return parts.filter(Boolean).join(", ");
};

/**
 * Get image URL from sighting with fallbacks
 * @param {Object} sighting - Sighting object
 * @param {Object} species - Species object
 * @returns {string|null} Image URL or null
 */
export const getSightingImage = (sighting, species) => {
  return sighting.mediaUrls?.[0] || 
         species?.imageUrl || 
         species?.image_url || 
         species?.image || 
         null;
};

/**
 * Get common name from species, handling comma-separated names
 * @param {Object} species - Species object
 * @returns {string} Common name
 */
export const getSpeciesCommonName = (species) => {
  const commonName = species?.commonName || "Unknown Species";
  return commonName.split(',')[0]?.trim() || commonName;
};

/**
 * Get conservation status badge color classes
 * @param {string} status - Conservation status
 * @returns {string} Tailwind CSS classes
 */
export const getConservationStatusClasses = (status) => {
  if (!status) return 'bg-green-50 text-green-700';
  
  if (status.includes('Endangered')) {
    return 'bg-red-50 text-red-700';
  }
  if (status === 'Vulnerable') {
    return 'bg-yellow-50 text-yellow-700';
  }
  return 'bg-green-50 text-green-700';
};

/**
 * Format observation date
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatObservationDate = (date) => {
  if (!date) return '';
  
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

/**
 * Truncate conservation status text
 * @param {string} status - Conservation status
 * @returns {string} Truncated status
 */
export const truncateConservationStatus = (status) => {
  if (!status) return '';
  return status.split(' ').slice(0, 2).join(' ');
};
