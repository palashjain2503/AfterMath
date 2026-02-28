import MBCard from '@/components/common/Card';
import { mockAlerts } from '@/services/emergencyService';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const Alerts = () => (
  <AuthenticatedLayout>
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold text-foreground mb-8">
        Emergency Alerts
      </motion.h1>
      <div className="space-y-4">
        {mockAlerts.map((a) => (
          <MBCard key={a.id} elevated>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${a.resolved ? 'bg-success/10' : 'bg-destructive/10'}`}>
                {a.resolved ? <CheckCircle className="text-success" size={24} /> : <AlertTriangle className="text-destructive" size={24} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-semibold text-foreground capitalize">{a.type} Alert</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    a.severity === 'critical' ? 'bg-destructive/20 text-destructive' :
                    a.severity === 'high' ? 'bg-warning/20 text-warning' : 'bg-secondary text-muted-foreground'
                  }`}>{a.severity}</span>
                </div>
                <p className="text-muted-foreground">{a.message}</p>
                <p className="text-sm text-muted-foreground mt-1">{a.timestamp}</p>
              </div>
              <span className={`text-sm font-medium ${a.resolved ? 'text-success' : 'text-destructive'}`}>
                {a.resolved ? 'Resolved' : 'Active'}
              </span>
            </div>
          </MBCard>
        ))}
      </div>
    </div>
  </AuthenticatedLayout>
);

export default Alerts;
