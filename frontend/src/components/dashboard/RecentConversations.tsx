import MBCard from '@/components/common/Card';
import { mockConversations } from '@/services/chatService';
import { MessageSquare } from 'lucide-react';

const RecentConversations = () => (
  <MBCard>
    <h3 className="text-lg font-display font-semibold text-foreground mb-4">Recent Conversations</h3>
    <div className="space-y-3">
      {mockConversations.map((c) => (
        <div key={c.id} className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare size={16} className="text-primary" />
            <span className="font-medium text-foreground text-sm">{c.userName}</span>
            <span className="text-xs text-muted-foreground ml-auto">{c.date}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{c.summary}</p>
        </div>
      ))}
    </div>
  </MBCard>
);

export default RecentConversations;
