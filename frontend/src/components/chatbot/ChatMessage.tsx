import { motion } from 'framer-motion';

interface ChatMessageProps {
  sender: 'user' | 'ai';
  text: string;
}

const ChatMessage = ({ sender, text }: ChatMessageProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
  >
    <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-lg leading-relaxed ${
      sender === 'user'
        ? 'gradient-primary text-primary-foreground rounded-br-md'
        : 'bg-secondary text-secondary-foreground rounded-bl-md'
    }`}>
      {text}
    </div>
  </motion.div>
);

export default ChatMessage;
