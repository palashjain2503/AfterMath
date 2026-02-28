import { useState, useEffect } from 'react';
import MBCard from '@/components/common/Card';
import MBButton from '@/components/common/Button';

const wordSets = [
  ['Apple', 'Chair', 'River', 'Cloud', 'Book'],
  ['Garden', 'Music', 'Bridge', 'Light', 'Ocean'],
  ['Mountain', 'Window', 'Flower', 'Clock', 'Train'],
];

const WordRecall = () => {
  const [phase, setPhase] = useState<'memorize' | 'recall' | 'result'>('memorize');
  const [words, setWords] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [recalled, setRecalled] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const startGame = () => {
    const set = wordSets[Math.floor(Math.random() * wordSets.length)];
    setWords(set);
    setPhase('memorize');
    setRecalled([]);
    setInput('');
    setScore(0);
    setTimeout(() => setPhase('recall'), 5004);
  };

  useEffect(() => { startGame(); }, []);

  const handleSubmit = () => {
    if (!input.trim()) return;
    const newRecalled = [...recalled, input.trim()];
    setRecalled(newRecalled);
    setInput('');
    if (newRecalled.length >= words.length) {
      const correct = newRecalled.filter((w) => words.some((wo) => wo.toLowerCase() === w.toLowerCase())).length;
      setScore(correct);
      setPhase('result');
    }
  };

  return (
    <MBCard elevated>
      <h3 className="text-xl font-display font-bold text-foreground mb-4">Word Recall</h3>
      {phase === 'memorize' && (
        <div>
          <p className="text-muted-foreground mb-3">Memorize these words:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {words.map((w) => (
              <span key={w} className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-semibold text-lg">{w}</span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Disappearing in 5 seconds...</p>
        </div>
      )}
      {phase === 'recall' && (
        <div>
          <p className="text-muted-foreground mb-3">Type the words you remember ({recalled.length}/{words.length}):</p>
          <div className="flex gap-2 mb-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type a word..."
            />
            <MBButton onClick={handleSubmit} size="sm">Add</MBButton>
          </div>
          <div className="flex flex-wrap gap-2">
            {recalled.map((w, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-secondary text-secondary-foreground text-sm">{w}</span>
            ))}
          </div>
        </div>
      )}
      {phase === 'result' && (
        <div className="text-center">
          <p className="text-3xl font-bold text-foreground mb-2">{score}/{words.length}</p>
          <p className="text-muted-foreground mb-4">words recalled correctly</p>
          <MBButton variant="secondary" onClick={startGame}>Play Again</MBButton>
        </div>
      )}
    </MBCard>
  );
};

export default WordRecall;
