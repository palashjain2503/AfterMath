import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCognitiveStore } from '@/store/cognitiveStore';
import MBCard from '@/components/common/Card';

const LonelinessIndex = () => {
  const { lonelinessData } = useCognitiveStore();
  return (
    <MBCard>
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">Loneliness Index</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={lonelinessData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
          <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))' }} />
          <Bar dataKey="index" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </MBCard>
  );
};

export default LonelinessIndex;
