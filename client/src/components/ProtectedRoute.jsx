import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // TODO: Replace with real authentication state (e.g., Context/Redux)
  // Example: const { isAuthenticated } = useAuth();
  const isAuthenticated = false; // placeholder until backend integration

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
