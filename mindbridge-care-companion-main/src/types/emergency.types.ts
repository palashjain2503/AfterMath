export interface EmergencyAlert {
  id: string;
  type: 'panic' | 'fall' | 'phrase' | 'inactivity';
  message: string;
  timestamp: string;
  resolved: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}
