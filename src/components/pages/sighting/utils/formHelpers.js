/**
 * Form submission utility functions
 */

/**
 * Combine date and time strings into ISO datetime
 * @param {string} date - Date string (YYYY-MM-DD)
 * @param {string} time - Time string (HH:mm)
 * @returns {string} ISO datetime string
 */
export const combineDateAndTime = (date, time) => {
  let observedAt = new Date();
  
  if (date) {
    const dateStr = time ? `${date}T${time}` : date;
    observedAt = new Date(dateStr);
  }
  
  return observedAt.toISOString();
};

/**
 * Build FormData object from sighting data
 * @param {Object} data - Sighting data
 * @param {string} data.date - Date string
 * @param {string} data.time - Time string
 * @param {Object} data.location - Location object with lat/lng
 * @param {string} data.notes - Notes text
 * @param {File[]} data.files - Media files
 * @param {string} [data.speciesId] - Optional species ID
 * @returns {FormData} FormData object ready for submission
 */
export const buildSightingFormData = ({ date, time, location, notes, files, speciesId }) => {
  const formData = new FormData();
  
  // Add observation datetime
  const observedAt = combineDateAndTime(date, time);
  formData.append('observedAt', observedAt);

  // Add location coordinates
  if (location) {
    formData.append('lat', location.lat.toString());
    formData.append('lng', location.lng.toString());
  }

  // Add notes if present
  if (notes) {
    formData.append('notes', notes);
  }
  
  // Add species ID if present
  if (speciesId) {
    formData.append('speciesId', speciesId);
  }

  // Add media files
  files.forEach(file => {
    formData.append('media', file);
  });

  return formData;
};

/**
 * Validate sighting form data
 * @param {Object} data - Form data to validate
 * @returns {Object} Validation result { isValid, errors }
 */
export const validateSightingForm = ({ location, files }) => {
  const errors = [];

  if (!location) {
    errors.push('Please select a location');
  }

  // Could add more validations here
  // e.g., minimum number of photos, date not in future, etc.

  return {
    isValid: errors.length === 0,
    errors
  };
};
