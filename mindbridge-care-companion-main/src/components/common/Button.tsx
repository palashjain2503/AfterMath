import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'px-4 py-2 rounded-xl font-medium text-muted-foreground hover:bg-secondary transition-colors',
  danger: 'px-6 py-3 rounded-xl font-semibold bg-destructive text-destructive-foreground hover:opacity-90 transition-all',
};

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'text-base',
  lg: 'text-lg px-8 py-4',
};

const MBButton = ({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`${variants[variant]} ${sizes[size]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    {...(props as any)}
  >
    {children}
  </motion.button>
);

export default MBButton;
