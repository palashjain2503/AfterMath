import MBCard from '@/components/common/Card';
import { Heart, Thermometer, Droplets } from 'lucide-react';

const metrics = [
  { icon: Heart, label: 'Heart Rate', value: '72 bpm', status: 'Normal' },
  { icon: Thermometer, label: 'Temperature', value: '36.6°C', status: 'Normal' },
  { icon: Droplets, label: 'Blood Pressure', value: '128/82', status: 'Slightly High' },
];

const HealthMetrics = () => (
  <MBCard>
    <h3 className="text-lg font-display font-semibold text-foreground mb-4">Health Metrics</h3>
    <div className="space-y-4">
      {metrics.map((m) => (
        <div key={m.label} className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <m.icon className="text-primary" size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{m.label}</p>
            <p className="font-semibold text-foreground">{m.value}</p>
          </div>
          <span className="text-sm text-success font-medium">{m.status}</span>
        </div>
      ))}
    </div>
  </MBCard>
);

export default HealthMetrics;
