import MoodTrend from '@/components/dashboard/MoodTrend';
import LonelinessIndex from '@/components/dashboard/LonelinessIndex';
import MBCard from '@/components/common/Card';
import PanicButton from '@/components/emergency/PanicButton';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { Clock, MessageSquare, TrendingUp } from 'lucide-react';

const Activity = () => (
  <AuthenticatedLayout>
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold text-foreground mb-8">
        Activity Overview 📊
      </motion.h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <MBCard className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10"><Clock className="text-primary" size={24} /></div>
          <div>
            <p className="text-sm text-muted-foreground">Avg. Interaction</p>
            <p className="text-xl font-bold text-foreground">24 min/day</p>
          </div>
        </MBCard>
        <MBCard className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-success/10"><MessageSquare className="text-success" size={24} /></div>
          <div>
            <p className="text-sm text-muted-foreground">Conversations</p>
            <p className="text-xl font-bold text-foreground">12 this week</p>
          </div>
        </MBCard>
        <MBCard className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent/10"><TrendingUp className="text-accent" size={24} /></div>
          <div>
            <p className="text-sm text-muted-foreground">Games Played</p>
            <p className="text-xl font-bold text-foreground">8 this week</p>
          </div>
        </MBCard>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MoodTrend />
        <LonelinessIndex />
      </div>
    </div>
    <PanicButton />
  </AuthenticatedLayout>
);

export default Activity;
