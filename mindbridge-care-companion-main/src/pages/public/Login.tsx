import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types/user.types';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import MBButton from '@/components/common/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('elderly');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, role);
    navigate(role === 'elderly' ? '/elderly/dashboard' : '/caregiver/dashboard');
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card-elevated p-8 w-full max-w-md"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <Brain className="text-primary" size={32} />
          <span className="font-display font-bold text-2xl text-foreground">MindBridge</span>
        </div>

        <h1 className="text-2xl font-display font-bold text-foreground text-center mb-6">Welcome Back</h1>

        <div className="flex gap-2 mb-6">
          {(['elderly', 'caregiver'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-3 rounded-xl font-medium capitalize transition-all ${
                role === r ? 'gradient-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Password"
          />
          <MBButton type="submit" className="w-full">Log In</MBButton>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link to="/forgot-password" className="text-primary hover:underline">Forgot Password?</Link>
          <p className="text-muted-foreground mt-2">
            Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
