import { Bell, Clock } from 'lucide-react';
import MBCard from '@/components/common/Card';

interface ReminderCardProps {
  title: string;
  time: string;
  description: string;
}

const ReminderCard = ({ title, time, description }: ReminderCardProps) => (
  <MBCard className="flex items-start gap-4">
    <div className="p-3 rounded-xl bg-primary/10">
      <Bell className="text-primary" size={24} />
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-foreground text-lg">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
      <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
        <Clock size={14} />
        <span>{time}</span>
      </div>
    </div>
  </MBCard>
);

export default ReminderCard;
