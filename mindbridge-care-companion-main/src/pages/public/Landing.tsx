import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Heart, Gamepad2, Shield, MessageCircle, Activity } from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';

const features = [
  { icon: Brain, title: 'Cognitive Monitoring', desc: 'Track cognitive health with AI-powered assessments and games.' },
  { icon: MessageCircle, title: 'AI Companion', desc: 'A caring digital companion that listens, chats, and remembers.' },
  { icon: Heart, title: 'Health Passport', desc: 'Digital health records accessible via QR code for emergencies.' },
  { icon: Gamepad2, title: 'Brain Games', desc: 'Fun cognitive exercises to keep the mind sharp and engaged.' },
  { icon: Shield, title: 'Emergency Alerts', desc: 'Panic button with instant caregiver notification system.' },
  { icon: Activity, title: 'Mood Tracking', desc: 'Monitor emotional well-being and loneliness indicators.' },
];

const Landing = () => (
  <div className="min-h-screen">
    {/* Navbar */}
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <Brain className="text-primary" size={32} />
        <span className="font-display font-bold text-2xl text-foreground">MindBridge</span>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link to="/login" className="btn-secondary text-sm">Log In</Link>
        <Link to="/signup" className="btn-primary text-sm">Sign Up</Link>
      </div>
    </nav>

    {/* Hero */}
    <section className="gradient-hero py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-foreground leading-tight mb-6"
        >
          Your Digital Grandchild.{' '}
          <span className="text-gradient">Your Smart Care Guardian.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          MindBridge combines AI companionship with cognitive monitoring to provide compassionate, intelligent care for your loved ones with dementia.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/signup" className="btn-primary text-lg px-8 py-4">Get Started Free</Link>
          <Link to="/login" className="btn-secondary text-lg px-8 py-4">Log In</Link>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-display font-bold text-center text-foreground mb-16"
      >
        Empowering Care with <span className="text-gradient">AI Technology</span>
      </motion.h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-elevated p-8 hover:scale-[1.02] transition-transform"
          >
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
              <f.icon className="text-primary-foreground" size={24} />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-border py-8 px-6 text-center text-muted-foreground">
      <p>© 2026 MindBridge. Compassionate AI for Dementia Care.</p>
    </footer>
  </div>
);

export default Landing;
