import { create } from 'zustand';
import type { ChatMessage } from '@/types/chat.types';

interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (text: string) => void;
  clearMessages: () => void;
}

const aiResponses = [
  "That's wonderful to hear! How has your day been so far?",
  "I'm glad you're doing well. Have you taken your medication today?",
  "That sounds lovely. Would you like to play a memory game?",
  "I understand. Remember, I'm always here to chat with you.",
  "That's a great memory! Keeping those memories alive is important.",
  "How about we do a quick brain exercise together?",
];

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    { id: '1', sender: 'ai', text: "Good morning, Margaret! 🌞 How are you feeling today?", timestamp: new Date(), mood: 'happy' },
  ],
  isTyping: false,
  sendMessage: (text) => {
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text, timestamp: new Date() };
    set((s) => ({ messages: [...s.messages, userMsg], isTyping: true }));
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(), sender: 'ai',
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(), mood: 'caring',
      };
      set((s) => ({ messages: [...s.messages, aiMsg], isTyping: false }));
    }, 1500);
  },
  clearMessages: () => set({ messages: [] }),
}));
