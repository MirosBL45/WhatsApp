import { useConversationStore } from '@/store/chat-store';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import ChatBubble from './ChatBubble';

export default function MessageContainer() {
  const { selectedConversation } = useConversationStore();
  const messages = useQuery(api.messages.getMessages, {
    conversation: selectedConversation!._id
  });
  const me = useQuery(api.users.getMe);

  return (
    <div className="relative p-3 flex-1 overflow-auto h-full bg-chat-tile-light dark:bg-chat-tile-dark">
      <div className="mx-12 flex flex-col gap-3 h-full">
        {messages?.map((msg) => (
          <div key={msg._id}>
            <ChatBubble message={msg} me={me} />
          </div>
        ))}
      </div>
    </div>
  );
}
