import { motion } from 'framer-motion';

interface CognitiveScoreRingProps {
  score: number;
  size?: number;
}

const CognitiveScoreRing = ({ score, size = 180 }: CognitiveScoreRingProps) => {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = score >= 70 ? 'hsl(var(--success))' : score >= 50 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke={color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-display font-bold text-foreground">{score}</span>
          <span className="text-sm text-muted-foreground">/ 100</span>
        </div>
      </div>
      <span className="font-medium text-foreground">Cognitive Score</span>
    </div>
  );
};

export default CognitiveScoreRing;
