import MBCard from '@/components/common/Card';
import { MessageSquare } from 'lucide-react';
import type { Conversation } from '@/types/chat.types';

const mockConversations: Conversation[] = [
  {
    id: '1', userId: '1', userName: 'Margaret Johnson',
    date: '2026-02-28',
    summary: 'Margaret discussed her morning routine and mentioned feeling slightly confused about her medication schedule.',
    emotionalTrend: 'Mostly positive with brief anxiety',
    messages: [],
  },
  {
    id: '2', userId: '1', userName: 'Margaret Johnson',
    date: '2026-02-27',
    summary: 'Pleasant conversation about family memories. Margaret recalled her granddaughter\'s birthday.',
    emotionalTrend: 'Happy and nostalgic',
    messages: [],
  },
];

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
