import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types/user.types';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: UserRole;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
