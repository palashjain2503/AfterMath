import { create } from 'zustand';
import type { User, UserRole } from '@/types/user.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const mockUsers: Record<string, User> = {
  elderly: {
    id: '1', name: 'Margaret Johnson', email: 'margaret@example.com', role: 'elderly', age: 78,
    emergencyContacts: [
      { name: 'Sarah Johnson', relationship: 'Daughter', phone: '+1 555-0123' },
      { name: 'Dr. Robert Smith', relationship: 'Doctor', phone: '+1 555-0456' },
    ],
    medicalHistory: ['Type 2 Diabetes', 'Mild Cognitive Impairment', 'Hypertension'],
    medications: ['Metformin 500mg', 'Donepezil 10mg', 'Lisinopril 20mg'],
  },
  caregiver: {
    id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'caregiver',
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (_email, _password, role) => {
    set({ user: mockUsers[role], isAuthenticated: true });
  },
  signup: (name, email, _password, role) => {
    set({ user: { id: '3', name, email, role }, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
