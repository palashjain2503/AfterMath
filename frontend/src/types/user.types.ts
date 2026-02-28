export type UserRole = 'elderly' | 'caregiver';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  age?: number;
  emergencyContacts?: EmergencyContact[];
  medicalHistory?: string[];
  medications?: string[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}
