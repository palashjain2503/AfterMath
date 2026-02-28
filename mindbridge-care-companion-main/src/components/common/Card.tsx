import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  onClick?: () => void;
}

const MBCard = ({ children, className = '', elevated = false, onClick }: CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`${elevated ? 'glass-card-elevated' : 'glass-card'} p-6 ${onClick ? 'cursor-pointer hover:scale-[1.01] transition-transform' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

export default MBCard;
