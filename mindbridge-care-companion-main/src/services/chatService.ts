import type { ChatMessage, Conversation } from '@/types/chat.types';

export const mockConversations: Conversation[] = [
  {
    id: '1', userId: '1', userName: 'Margaret Johnson',
    date: '2026-02-28',
    summary: 'Margaret discussed her morning routine and mentioned feeling slightly confused about her medication schedule.',
    emotionalTrend: 'Mostly positive with brief anxiety',
    messages: [
      { id: '1', sender: 'ai', text: 'Good morning! How are you today?', timestamp: new Date() },
      { id: '2', sender: 'user', text: 'I feel a bit confused about my pills.', timestamp: new Date() },
    ],
  },
  {
    id: '2', userId: '1', userName: 'Margaret Johnson',
    date: '2026-02-27',
    summary: 'Pleasant conversation about family memories. Margaret recalled her granddaughter\'s birthday.',
    emotionalTrend: 'Happy and nostalgic',
    messages: [],
  },
];

export const sendMessage = async (text: string): Promise<ChatMessage> => {
  return { id: Date.now().toString(), sender: 'ai', text: 'Mock response', timestamp: new Date() };
};
