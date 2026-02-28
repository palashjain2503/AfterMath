import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from '@/components/common/ThemeToggle';
import { Brain, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const links = user?.role === 'elderly'
    ? [
        { to: '/elderly/dashboard', label: 'Dashboard' },
        { to: '/elderly/chat', label: 'Chat' },
        { to: '/elderly/games', label: 'Games' },
        { to: '/elderly/activity', label: 'Activity' },
        { to: '/elderly/health-passport', label: 'Health' },
      ]
    : [
        { to: '/caregiver/dashboard', label: 'Dashboard' },
        { to: '/caregiver/conversations', label: 'Conversations' },
        { to: '/caregiver/alerts', label: 'Alerts' },
        { to: '/caregiver/manage-profile', label: 'Profile' },
      ];

  return (
    <nav className="sticky top-0 z-40 glass-card rounded-none border-x-0 border-t-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={isAuthenticated ? (user?.role === 'elderly' ? '/elderly/dashboard' : '/caregiver/dashboard') : '/'} className="flex items-center gap-2">
            <Brain className="text-primary" size={28} />
            <span className="font-display font-bold text-xl text-foreground">MindBridge</span>
          </Link>

          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {isAuthenticated && (
              <>
                <span className="hidden sm:block text-sm text-muted-foreground">{user?.name}</span>
                <button onClick={handleLogout} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" aria-label="Logout">
                  <LogOut size={20} />
                </button>
              </>
            )}
            {isAuthenticated && (
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl text-muted-foreground hover:bg-secondary" aria-label="Menu">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && isAuthenticated && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden overflow-hidden border-t border-border">
            <div className="px-4 py-2 space-y-1">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
