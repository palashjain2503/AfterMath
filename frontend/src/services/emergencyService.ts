import type { EmergencyAlert } from '@/types/emergency.types';

export const mockAlerts: EmergencyAlert[] = [
  { id: '1', type: 'panic', message: 'Panic button pressed', timestamp: '2026-02-28 09:15', resolved: false, severity: 'critical' },
  { id: '2', type: 'fall', message: 'Possible fall detected', timestamp: '2026-02-27 14:30', resolved: true, severity: 'high' },
  { id: '3', type: 'phrase', message: 'Distress phrase detected: "I don\'t know where I am"', timestamp: '2026-02-26 11:00', resolved: true, severity: 'high' },
  { id: '4', type: 'inactivity', message: 'No activity for 4 hours', timestamp: '2026-02-25 16:45', resolved: true, severity: 'medium' },
];

export const triggerEmergency = async () => ({ success: true });
