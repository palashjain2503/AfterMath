import MBCard from '@/components/common/Card';
import { mockConversations } from '@/services/chatService';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { MessageSquare, TrendingUp } from 'lucide-react';

const Conversations = () => (
  <AuthenticatedLayout>
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold text-foreground mb-8">
        Conversation History
      </motion.h1>
      <div className="space-y-4">
        {mockConversations.map((c) => (
          <MBCard key={c.id} elevated>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <MessageSquare className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-foreground">{c.userName}</h3>
                  <span className="text-sm text-muted-foreground">{c.date}</span>
                </div>
                <p className="text-muted-foreground mb-3">{c.summary}</p>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp size={14} className="text-primary" />
                  <span className="text-primary font-medium">{c.emotionalTrend}</span>
                </div>
              </div>
            </div>
          </MBCard>
        ))}
      </div>
    </div>
  </AuthenticatedLayout>
);

export default Conversations;
