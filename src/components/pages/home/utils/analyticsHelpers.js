/**
 * Analytics utility functions
 */

/**
 * Transform analytics API response into display items
 * @param {Object} stats - Analytics data from API
 * @param {Array} config - Analytics items configuration
 * @returns {Array} Array of analytics items with formatted data
 */
export const transformAnalyticsData = (stats, config) => {
  if (!stats) return config.map(item => ({
    title: item.title,
    value: 0,
    percent: 0,
  }));

  return config.map(item => ({
    title: item.title,
    value: stats[item.key] || 0,
    percent: stats.percentages?.[item.percentKey] || 0,
  }));
};
