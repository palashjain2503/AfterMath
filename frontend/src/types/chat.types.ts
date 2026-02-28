export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  mood?: string;
}

export interface Conversation {
  id: string;
  userId: string;
  userName: string;
  messages: ChatMessage[];
  summary?: string;
  emotionalTrend?: string;
  date: string;
}
