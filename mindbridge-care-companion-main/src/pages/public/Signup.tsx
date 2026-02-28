import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types/user.types';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import MBButton from '@/components/common/Button';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('elderly');
  const [agreed, setAgreed] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    signup(name, email, password, role);
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

        <h1 className="text-2xl font-display font-bold text-foreground text-center mb-6">Create Account</h1>

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
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Full name" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Email" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Password" />
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="rounded border-border text-primary focus:ring-primary" />
            I agree to the Terms of Service and Privacy Policy
          </label>
          <MBButton type="submit" className="w-full" disabled={!agreed}>Create Account</MBButton>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
