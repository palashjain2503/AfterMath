import { useState, useEffect } from 'react';
import MBCard from '@/components/common/Card';
import MBButton from '@/components/common/Button';
import { motion } from 'framer-motion';

const generatePattern = (len: number) => Array.from({ length: len }, () => Math.floor(Math.random() * 4));
const colors = ['bg-primary', 'bg-success', 'bg-warning', 'bg-destructive'];

const PatternRecognition = () => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [showingPattern, setShowingPattern] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [level, setLevel] = useState(3);
  const [result, setResult] = useState<string | null>(null);

  const startGame = () => {
    const p = generatePattern(level);
    setPattern(p);
    setUserPattern([]);
    setResult(null);
    setShowingPattern(true);
    p.forEach((_, i) => {
      setTimeout(() => setActiveIdx(p[i]), i * 600);
      setTimeout(() => setActiveIdx(-1), i * 600 + 400);
    });
    setTimeout(() => setShowingPattern(false), p.length * 600 + 200);
  };

  const handleClick = (idx: number) => {
    if (showingPattern) return;
    const newPattern = [...userPattern, idx];
    setUserPattern(newPattern);
    if (newPattern.length === pattern.length) {
      const correct = newPattern.every((v, i) => v === pattern[i]);
      setResult(correct ? '✅ Correct!' : '❌ Try again');
      if (correct) setLevel((l) => Math.min(l + 1, 8));
    }
  };

  useEffect(() => { startGame(); }, []);

  return (
    <MBCard elevated>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-display font-bold text-foreground">Pattern Recognition</h3>
        <span className="text-sm text-muted-foreground">Level {level - 2}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4 max-w-[200px] mx-auto">
        {colors.map((c, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(i)}
            className={`aspect-square rounded-xl ${c} transition-all ${activeIdx === i ? 'opacity-100 scale-110' : 'opacity-40'}`}
          />
        ))}
      </div>
      {result && <p className="text-center text-lg font-semibold text-foreground mb-3">{result}</p>}
      <MBButton variant="secondary" size="sm" onClick={startGame}>
        {showingPattern ? 'Showing...' : 'New Pattern'}
      </MBButton>
    </MBCard>
  );
};

export default PatternRecognition;
