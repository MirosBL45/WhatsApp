import { IMessage, useConversationStore } from '@/store/chat-store';
import {
  OtherMessageIndicator,
  TextMessage,
  MessageTime,
  SelfMessageIndicator,
  ImageDialog,
  ImageMessage,
  VideoMessage,
} from './smallComponents';
import { useState } from 'react';
import DateIndicator from './DateIndicator';
import ChatBubbleAvatar from './ChatBubbleAvatar';
import ChatAvatarActions from './ChatAvatarActions';

type ChatBubbleProps = {
  message: IMessage;
  me: any;
  previousMessage?: IMessage;
};

export default function ChatBubble({
  me,
  message,
  previousMessage,
}: ChatBubbleProps) {
  const date = new Date(message._creationTime);
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const time = `${hour}:${minute}`;

  const { selectedConversation } = useConversationStore();
  const isMember =
    selectedConversation?.participants.includes(message.sender._id) || false;
  const isGroup = selectedConversation?.isGroup;
  const fromMe = message.sender._id === me._id;
  const bgClass = fromMe ? 'bg-green-chat' : 'bg-white dark:bg-gray-primary';

  const [open, setOpen] = useState(false);

  function renderMessageContent() {
    switch (message.messageType) {
      case 'text':
        return <TextMessage message={message} />;
      case 'image':
        return (
          <ImageMessage message={message} handleClick={() => setOpen(true)} />
        );
      case 'video':
        return <VideoMessage message={message} />;
      default:
        return null;
    }
  }

  if (!fromMe) {
    return (
      <>
        <DateIndicator message={message} previousMessage={previousMessage} />

        <div className="flex gap-1 w-2/3">
          <ChatBubbleAvatar
            isGroup={isGroup}
            isMember={isMember}
            message={message}
          />
          <div
            className={`flex flex-col z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative ${bgClass}`}
          >
            <OtherMessageIndicator />
            {isGroup && <ChatAvatarActions message={message} me={me} />}

            {/* {<ChatAvatarActions message={message} me={me} />} */}
            {renderMessageContent()}
            {open && (
              <ImageDialog
                src={message.content}
                open={open}
                onClose={() => setOpen(false)}
              />
            )}

            <MessageTime time={time} fromMe={fromMe} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DateIndicator message={message} previousMessage={previousMessage} />

      <div className="flex gap-1 w-2/3 ml-auto">
        <div
          className={`flex  z-20 max-w-fit px-2 pt-1 rounded-md shadow-md ml-auto relative ${bgClass}`}
        >
          <SelfMessageIndicator />
          {renderMessageContent()}
          {open && (
            <ImageDialog
              src={message.content}
              open={open}
              onClose={() => setOpen(false)}
            />
          )}
          <MessageTime time={time} fromMe={fromMe} />
        </div>
      </div>
    </>
  );
}
