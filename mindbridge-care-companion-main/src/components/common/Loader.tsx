import { motion } from 'framer-motion';

const Loader = () => (
  <div className="flex items-center justify-center p-8">
    <motion.div
      className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

export default Loader;
