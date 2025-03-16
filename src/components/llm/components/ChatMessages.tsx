'use client';

import { HTMLAttributes, useContext, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { MessagesContext } from '@/context/Messages';
import { Message } from '@/validation/message';
import MarkdownLite from './MarkdownLite';

// Message 타입 import

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
}

const ChatMessages = ({ className, isLoading, ...props }: ChatMessageProps) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div
      {...props}
      className={cn(
        'scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch custom-scrollbar flex max-h-[260px] min-h-[260px] flex-col-reverse gap-2 overflow-y-auto',
        className
      )}
    >
      <div ref={messagesEndRef} />
      {isLoading && (
        <div className="flex items-center justify-center p-2">
          <Loader2 className="h-6 w-6 animate-spin text-red-500" />
        </div>
      )}
      {inverseMessages.map((message: Message) => (
        <div key={message.id} className="chat-message">
          <div
            className={cn('flex items-end', {
              'justify-end': message.isUserMessage,
            })}
          >
            <div
              className={cn(
                'mx-2 flex max-w-xs flex-col space-y-2 overflow-x-hidden text-sm',
                {
                  'order-1 items-end': message.isUserMessage,
                  'order-2 items-start': !message.isUserMessage,
                }
              )}
            >
              <p
                className={cn('rounded-lg px-4 py-2', {
                  'bg-red-800 text-white': message.isUserMessage,
                  'bg-gray-200 text-gray-900': !message.isUserMessage,
                })}
                role="log"
                aria-live="polite"
              >
                <MarkdownLite text={message.text} />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
