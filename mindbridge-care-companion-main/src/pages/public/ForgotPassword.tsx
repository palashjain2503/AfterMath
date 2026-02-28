import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import MBButton from '@/components/common/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card-elevated p-8 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Brain className="text-primary" size={32} />
          <span className="font-display font-bold text-2xl text-foreground">MindBridge</span>
        </div>
        <h1 className="text-2xl font-display font-bold text-foreground text-center mb-6">Reset Password</h1>
        {sent ? (
          <div className="text-center">
            <p className="text-success text-lg mb-4">✅ Reset link sent to your email!</p>
            <Link to="/login" className="text-primary hover:underline">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Email" />
            <MBButton type="submit" className="w-full">Send Reset Link</MBButton>
            <p className="text-center text-sm text-muted-foreground">
              <Link to="/login" className="text-primary hover:underline">Back to Login</Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
