/**
 * Media upload utility functions
 */

/**
 * Filter files to only valid media types
 * @param {FileList|File[]} files - Files to filter
 * @returns {File[]} Filtered array of valid files
 */
export const filterValidMediaFiles = (files) => {
  return Array.from(files).filter(file => 
    file.type.startsWith('image/') || file.type.startsWith('video/')
  );
};

/**
 * Create preview objects for files
 * @param {File[]} files - Array of files
 * @returns {Object[]} Array of preview objects with id, url, and type
 */
export const createFilePreviews = (files) => {
  return files.map(file => ({
    id: file.name,
    url: URL.createObjectURL(file),
    type: file.type
  }));
};

/**
 * Cleanup preview URLs to prevent memory leaks
 * @param {Object[]} previews - Array of preview objects
 */
export const cleanupPreviews = (previews) => {
  previews.forEach(preview => URL.revokeObjectURL(preview.url));
};

/**
 * Check if file is an image
 * @param {string} type - MIME type
 * @returns {boolean}
 */
export const isImageFile = (type) => {
  return type.startsWith('image/');
};

/**
 * Check if file is a video
 * @param {string} type - MIME type
 * @returns {boolean}
 */
export const isVideoFile = (type) => {
  return type.startsWith('video/');
};
