import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCognitiveStore } from '@/store/cognitiveStore';
import MBCard from '@/components/common/Card';

const CognitiveGraph = () => {
  const { scores } = useCognitiveStore();
  return (
    <MBCard>
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">Cognitive Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={scores}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
          <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))' }} />
          <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </MBCard>
  );
};

export default CognitiveGraph;
