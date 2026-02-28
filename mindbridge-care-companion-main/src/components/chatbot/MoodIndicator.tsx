import { Smile, Meh, Frown, Heart } from 'lucide-react';

const moods: Record<string, { icon: typeof Smile; label: string; color: string }> = {
  happy: { icon: Smile, label: 'Happy', color: 'text-success' },
  neutral: { icon: Meh, label: 'Neutral', color: 'text-warning' },
  sad: { icon: Frown, label: 'Sad', color: 'text-destructive' },
  caring: { icon: Heart, label: 'Caring', color: 'text-primary' },
};

const MoodIndicator = ({ mood = 'neutral' }: { mood: string }) => {
  const m = moods[mood] || moods.neutral;
  const Icon = m.icon;
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary ${m.color}`}>
      <Icon size={18} />
      <span className="text-sm font-medium">{m.label}</span>
    </div>
  );
};

export default MoodIndicator;
