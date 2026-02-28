import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { user, isAuthenticated, login, signup, logout } = useAuthStore();
  return { user, isAuthenticated, login, signup, logout };
};
