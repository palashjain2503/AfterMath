import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCognitiveStore } from '@/store/cognitiveStore';
import MBCard from '@/components/common/Card';

const MoodTrend = () => {
  const { moods } = useCognitiveStore();
  return (
    <MBCard>
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">Mood Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={moods}>
          <defs>
            <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 10]} />
          <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))' }} />
          <Area type="monotone" dataKey="mood" stroke="hsl(var(--primary))" fill="url(#moodGrad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </MBCard>
  );
};

export default MoodTrend;
