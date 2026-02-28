import ChatWidget from '@/components/chatbot/ChatWidget';
import PanicButton from '@/components/emergency/PanicButton';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';

const Chat = () => (
  <AuthenticatedLayout>
    <div className="max-w-5xl mx-auto px-4 py-6">
      <ChatWidget />
    </div>
    <PanicButton />
  </AuthenticatedLayout>
);

export default Chat;
