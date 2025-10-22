import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // 🚨 TEMPORARY BYPASS FOR DEVELOPMENT - REMOVE BEFORE PRODUCTION! 🚨
  // Set VITE_BYPASS_AUTH=true in .env.local to bypass authentication
  const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === 'true';
  
  // TODO: Replace with actual auth check from context/state management
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated && !bypassAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
