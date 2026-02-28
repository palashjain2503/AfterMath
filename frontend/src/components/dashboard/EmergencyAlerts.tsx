import MBCard from '@/components/common/Card';
import { mockAlerts } from '@/services/emergencyService';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const EmergencyAlerts = () => (
  <MBCard>
    <h3 className="text-lg font-display font-semibold text-foreground mb-4">Emergency Alerts</h3>
    <div className="space-y-3">
      {mockAlerts.slice(0, 3).map((a) => (
        <div key={a.id} className={`flex items-start gap-3 p-3 rounded-xl ${a.resolved ? 'bg-secondary' : 'bg-destructive/10'}`}>
          {a.resolved ? <CheckCircle size={18} className="text-success mt-0.5" /> : <AlertTriangle size={18} className="text-destructive mt-0.5" />}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{a.message}</p>
            <p className="text-xs text-muted-foreground">{a.timestamp}</p>
          </div>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            a.severity === 'critical' ? 'bg-destructive/20 text-destructive' :
            a.severity === 'high' ? 'bg-warning/20 text-warning' : 'bg-secondary text-muted-foreground'
          }`}>{a.severity}</span>
        </div>
      ))}
    </div>
  </MBCard>
);

export default EmergencyAlerts;
