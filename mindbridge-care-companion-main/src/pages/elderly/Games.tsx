import MemoryMatch from '@/components/games/MemoryMatch';
import PatternRecognition from '@/components/games/PatternRecognition';
import WordRecall from '@/components/games/WordRecall';
import ReactionTest from '@/components/games/ReactionTest';
import PanicButton from '@/components/emergency/PanicButton';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { motion } from 'framer-motion';
import MBCard from '@/components/common/Card';
import { useCognitiveStore } from '@/store/cognitiveStore';

const Games = () => {
  const { gameResults } = useCognitiveStore();

  return (
    <AuthenticatedLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold text-foreground mb-8">
          Brain Games 🧩
        </motion.h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {gameResults.map((r) => (
            <MBCard key={r.game} className="text-center">
              <p className="text-sm text-muted-foreground">{r.game}</p>
              <p className="text-2xl font-bold text-foreground">{r.accuracy}%</p>
              <p className="text-xs text-muted-foreground">accuracy</p>
            </MBCard>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <MemoryMatch />
          <PatternRecognition />
          <WordRecall />
          <ReactionTest />
        </div>
      </div>
      <PanicButton />
    </AuthenticatedLayout>
  );
};

export default Games;
