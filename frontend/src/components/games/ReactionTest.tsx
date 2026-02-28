import { useState, useCallback } from 'react';
import MBCard from '@/components/common/Card';
import MBButton from '@/components/common/Button';
import { motion } from 'framer-motion';

const ReactionTest = () => {
  const [state, setState] = useState<'waiting' | 'ready' | 'go' | 'result'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);

  const startTest = useCallback(() => {
    setState('ready');
    const delay = 2000 + Math.random() * 3000;
    setTimeout(() => {
      setState('go');
      setStartTime(Date.now());
    }, delay);
  }, []);

  const handleClick = () => {
    if (state === 'go') {
      setReactionTime(Date.now() - startTime);
      setState('result');
    } else if (state === 'ready') {
      setState('waiting');
    }
  };

  return (
    <MBCard elevated>
      <h3 className="text-xl font-display font-bold text-foreground mb-4">Reaction Test</h3>
      <motion.div
        onClick={handleClick}
        className={`aspect-video rounded-xl flex items-center justify-center cursor-pointer text-xl font-bold mb-4 ${
          state === 'go' ? 'bg-success text-success-foreground' :
          state === 'ready' ? 'bg-warning text-warning-foreground' :
          'bg-secondary text-secondary-foreground'
        }`}
      >
        {state === 'waiting' && 'Click Start'}
        {state === 'ready' && 'Wait for green...'}
        {state === 'go' && 'CLICK NOW!'}
        {state === 'result' && `${reactionTime}ms`}
      </motion.div>
      <MBButton variant="secondary" onClick={startTest} size="sm">
        {state === 'result' ? 'Try Again' : 'Start'}
      </MBButton>
    </MBCard>
  );
};

export default ReactionTest;
