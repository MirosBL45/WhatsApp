import { MessageSeenSvg } from "@/lib/svgs";
import { IMessage } from "@/store/chat-store";

export const OtherMessageIndicator = () => (
    <div className='absolute bg-white dark:bg-gray-primary top-0 -left-[4px] w-3 h-3 rounded-bl-full' />
);

export function TextMessage({ message }: { message: IMessage }) {
    // Check if the content is a URL
    const isLink = /^(ftp|http|https):\/\/[^ "]+$/.test(message.content);

    return (
        <div>
            {isLink ? (
                <a
                    href={message.content}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`mr-2 text-sm font-light text-blue-400 underline`}
                >
                    {message.content}
                </a>
            ) : (
                <p className={`mr-2 text-sm font-light`}>{message.content}</p>
            )}
        </div>
    );
};

export function MessageTime({ time, fromMe }: { time: string; fromMe: boolean }) {
    return (
        <p className='text-[10px] mt-2 self-end flex gap-1 items-center'>
            {time} {fromMe && <MessageSeenSvg />}
        </p>
    );
};
