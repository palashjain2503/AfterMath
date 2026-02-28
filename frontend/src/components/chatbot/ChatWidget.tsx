import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/store/chatStore';
import ChatMessage from './ChatMessage';
import VoiceRecorder from './VoiceRecorder';
import MoodIndicator from './MoodIndicator';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatWidget = () => {
  const { messages, isTyping, sendMessage, sendVoiceMessage } = useChatStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleVoiceAudio = (audioBase64: string) => {
    sendVoiceMessage(audioBase64);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-display font-bold text-foreground">AI Companion</h2>
        <MoodIndicator mood="happy" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 glass-card mb-4 space-y-2">
        {messages.map((m) => (
          <ChatMessage key={m.id} sender={m.sender} text={m.text} />
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 px-5 py-3 bg-secondary rounded-2xl rounded-bl-md w-fit">
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-2 h-2 bg-muted-foreground rounded-full" />
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-muted-foreground rounded-full" />
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-muted-foreground rounded-full" />
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-3 items-center">
        <VoiceRecorder onTranscript={(t) => { setInput(t); }} onAudio={handleVoiceAudio} />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-5 py-4 rounded-xl bg-card border border-border text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Message input"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="p-4 rounded-xl gradient-primary text-primary-foreground"
          aria-label="Send message"
        >
          <Send size={22} />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatWidget;
