/**
 * User Management Utility Functions
 */

/**
 * Get badge color classes based on user role
 * @param {string} role - User role (admin, moderator, researcher, user)
 * @returns {string} Tailwind CSS classes for the badge
 */
export const getRoleBadgeColor = (role) => {
  const colors = {
    admin: 'bg-purple-100 text-purple-700 border-purple-200',
    moderator: 'bg-blue-100 text-blue-700 border-blue-200',
    researcher: 'bg-green-100 text-green-700 border-green-200',
    user: 'bg-gray-100 text-gray-700 border-gray-200'
  };
  return colors[role] || colors.user;
};

/**
 * Get badge color classes based on user status
 * @param {string} status - User status (active, inactive)
 * @returns {string} Tailwind CSS classes for the badge
 */
export const getStatusBadgeColor = (status) => {
  return status === 'active' 
    ? 'bg-green-100 text-green-700 border-green-200' 
    : 'bg-red-100 text-red-700 border-red-200';
};
