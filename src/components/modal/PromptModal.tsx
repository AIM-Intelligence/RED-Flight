import React, { useEffect, useRef, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';
// import { useDrawer } from '@/store/use-drawer-store';
import { useModal } from '@/store/use-modal-store';
import MarkdownLite from '../llm/components/MarkdownLite';
import { Button } from '../ui/Button';

interface Message {
  id: string;
  text: string;
  isUserMessage: boolean;
}

const RedPromptModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  //const { onOpen } = useDrawer();
  const [parsedMessages, setParsedMessages] = useState<Message[]>([]);
  const isModalOpen = isOpen && type === 'showRedPromptData';
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && data.red_prompt) {
      try {
        let messages: Message[];
        if (typeof data.red_prompt.prompt === 'string') {
          messages = JSON.parse(data.red_prompt.prompt);
        } else {
          throw new Error('Invalid red_prompt format');
        }

        if (Array.isArray(messages) && messages.every(isValidMessage)) {
          setParsedMessages(messages);
        } else {
          throw new Error('Invalid message format');
        }
      } catch (error) {
        console.error('Error parsing red_prompt data:', error);
        setParsedMessages([]);
      }
    } else {
      setParsedMessages([]);
    }
  }, [data]);

  useEffect(() => {
    if (isModalOpen && scrollRef.current) {
      setTimeout(() => {
        const scrollElement = scrollRef.current;
        scrollElement?.scrollTo({
          top: scrollElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
    }
  }, [isModalOpen, parsedMessages]);

  function isValidMessage(message: any): message is Message {
    return (
      typeof message === 'object' &&
      typeof message.id === 'string' &&
      typeof message.text === 'string' &&
      typeof message.isUserMessage === 'boolean'
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="border-red-600 bg-black text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Attack Prompt</DialogTitle>
        </DialogHeader>
        <div
          ref={scrollRef}
          className={cn(
            'scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch custom-scrollbar flex max-h-[360px] min-h-[400px] flex-col gap-2 overflow-y-auto p-4'
          )}
        >
          {parsedMessages.map((message) => (
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
                      'bg-red-600 text-white': message.isUserMessage,
                      'bg-gray-200 text-gray-900': !message.isUserMessage,
                    })}
                  >
                    <MarkdownLite text={message.text} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            //onClick={() => onOpen('showNFTClaimDrawer', data)}
          >
            Claim NFT
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RedPromptModal;
