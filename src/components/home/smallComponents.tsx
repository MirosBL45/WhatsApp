import { MessageSeenSvg } from '@/lib/svgs';
import { IMessage } from '@/store/chat-store';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { Dialog, DialogContent, DialogDescription } from '../ui/dialog';

export const OtherMessageIndicator = () => (
  <div className="absolute bg-white dark:bg-gray-primary top-0 -left-[4px] w-3 h-3 rounded-bl-full" />
);

export function TextMessage({ message }: { message: IMessage }) {
  // Check if the content is a URL
  const isLink = /^(ftp|http|https):\/\/[^ "]+$/.test(message.content);

  return (
    <div>
      {isLink ? (
        <a
          href={message.content}
          target="_blank"
          rel="noopener noreferrer"
          className={`mr-2 text-sm font-light text-blue-400 underline`}
        >
          {message.content}
        </a>
      ) : (
        <p className={`mr-2 text-sm font-light`}>{message.content}</p>
      )}
    </div>
  );
}

export function MessageTime({
  time,
  fromMe,
}: {
  time: string;
  fromMe: boolean;
}) {
  return (
    <p className="text-[10px] mt-2 self-end flex gap-1 items-center">
      {time} {fromMe && <MessageSeenSvg />}
    </p>
  );
}

export const SelfMessageIndicator = () => (
  <div className="absolute bg-green-chat top-0 -right-[3px] w-3 h-3 rounded-br-full overflow-hidden" />
);

export function ImageDialog({
  src,
  onClose,
  open,
}: {
  open: boolean;
  src: string;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="min-w-[750px]">
        <DialogDescription className="relative h-[450px] flex justify-center">
          <Image
            src={src}
            fill
            className="rounded-lg object-contain"
            alt="image"
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export function ImageMessage({
  message,
  handleClick,
}: {
  message: IMessage;
  handleClick: () => void;
}) {
  return (
    <div className="w-[250px] h-[250px] m-2 relative">
      <Image
        src={message.content}
        fill
        className="cursor-pointer object-cover rounded"
        alt="image"
        onClick={handleClick}
      />
    </div>
  );
}

export function VideoMessage({ message }: { message: IMessage }) {
  return (
    <ReactPlayer
      url={message.content}
      width="250px"
      height="250px"
      controls={true}
      light={true}
    />
  );
}
