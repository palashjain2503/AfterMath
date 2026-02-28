import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MBCard from '@/components/common/Card';
import MBButton from '@/components/common/Button';

const emojis = ['🧠', '❤️', '⭐', '🌺', '🎵', '🦋', '🌈', '🍎'];
const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

const MemoryMatch = () => {
  const [cards, setCards] = useState(shuffled.map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false })));
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    if (selected.length === 2) {
      const [a, b] = selected;
      setMoves((m) => m + 1);
      if (cards[a].emoji === cards[b].emoji) {
        setCards((c) => c.map((card, i) => (i === a || i === b ? { ...card, matched: true } : card)));
        setMatches((m) => m + 1);
        setSelected([]);
      } else {
        setTimeout(() => {
          setCards((c) => c.map((card, i) => (i === a || i === b ? { ...card, flipped: false } : card)));
          setSelected([]);
        }, 800);
      }
    }
  }, [selected, cards]);

  const handleClick = (i: number) => {
    if (selected.length >= 2 || cards[i].flipped || cards[i].matched) return;
    setCards((c) => c.map((card, idx) => (idx === i ? { ...card, flipped: true } : card)));
    setSelected((s) => [...s, i]);
  };

  const reset = () => {
    const newCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5).map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }));
    setCards(newCards);
    setSelected([]);
    setMoves(0);
    setMatches(0);
  };

  return (
    <MBCard elevated>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-display font-bold text-foreground">Memory Match</h3>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Moves: {moves}</span>
          <span>Matches: {matches}/{emojis.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {cards.map((card, i) => (
          <motion.button
            key={card.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(i)}
            className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all ${
              card.flipped || card.matched ? 'bg-primary/10' : 'bg-secondary hover:bg-secondary/80'
            } ${card.matched ? 'opacity-60' : ''}`}
          >
            <AnimatePresence mode="wait">
              {(card.flipped || card.matched) ? (
                <motion.span key="emoji" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} exit={{ rotateY: 90 }}>
                  {card.emoji}
                </motion.span>
              ) : (
                <motion.span key="hidden" className="text-muted-foreground text-xl">?</motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
      {matches === emojis.length && <p className="text-center text-success font-bold text-lg mb-3">🎉 Congratulations!</p>}
      <MBButton variant="secondary" size="sm" onClick={reset}>Reset Game</MBButton>
    </MBCard>
  );
};

export default MemoryMatch;
