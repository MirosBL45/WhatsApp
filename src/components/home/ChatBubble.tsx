import { IMessage, useConversationStore } from "@/store/chat-store";
import { OtherMessageIndicator, TextMessage, MessageTime } from './smallComponents';

type ChatBubbleProps = {
  message: IMessage;
  me: any;
}

export default function ChatBubble({ me, message }: ChatBubbleProps) {
  const date = new Date(message._creationTime);
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const time = `${hour}:${minute}`;

  const { selectedConversation } = useConversationStore();
  const isMember = selectedConversation?.participants.includes(message.sender._id) || false;
  const isGroup = selectedConversation?.isGroup;
  const fromMe = message.sender._id === me._id;
  const bgClass = fromMe ? 'bg-green-chat' : 'bg-white dark:bg-gray-primary';

  if (!fromMe) {
    return (
      <>
        <div className="flex gap-1 w-2/3">
          <div className={`flex flex-col z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative ${bgClass}`}>
            <OtherMessageIndicator />
            <TextMessage message={message} />
            <MessageTime time={time} fromMe={fromMe} />
          </div>
        </div>
      </>
    )
  }

  return <></>;
}