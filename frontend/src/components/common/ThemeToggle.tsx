import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { isDark, toggle } = useDarkMode();
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="p-2 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
};

export default ThemeToggle;
