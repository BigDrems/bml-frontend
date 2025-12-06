import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from '../ui/LoadingScreen';

/**
 * AdminRoute - Protects routes that should only be accessible by admin users
 * Checks both authentication and admin role
 */
const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // Not logged in - redirect to auth
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user has admin role
  // Handle different possible locations of the role property
  // and case-insensitive comparison
  const userRole = user.role || user.data?.role || user.user?.role || '';
  const normalizedRole = userRole.toUpperCase();
  const isAdmin = normalizedRole === 'ADMIN' || normalizedRole === 'EXPERT';

  if (!isAdmin) {
    // User is logged in but not an admin - redirect to home
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
