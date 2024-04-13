import { messages } from '@/dummy-data/db';
import ChatBubble from './ChatBubble';

export default function MessageContainer() {
  return (
    <div className="relative p-3 flex-1 overflow-auto h-full bg-chat-tile-light dark:bg-chat-tile-dark">
      <div className="mx-12 flex flex-col gap-3 h-full">
        {messages?.map((msg) => (
          <div key={msg._id}>
            <ChatBubble />
          </div>
        ))}
      </div>
    </div>
  );
}
