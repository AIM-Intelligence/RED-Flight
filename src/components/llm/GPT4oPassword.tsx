'use client';

import { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import useAIChatServer from '@/hooks/getAIChatServer.tsx/useGPTChatServer';
import ChatHeader from './components/ChatHeader';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';

export function GPT4oPasswordAccordion({ onToggle }: any) {
  const [close, setClose] = useState(0);
  const [hasBeenOpened, setHasBeenOpened] = useState(false); // State to track if the accordion has been opened
  const firstTouch = true;

  const { isPending } = useAIChatServer(firstTouch);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onToggle(close === 1);
  }, [close, onToggle]);

  const handleAccordionClick = () => {
    if (!hasBeenOpened) {
      setClose((prevClose) => (prevClose ? 0 : 1));
      setHasBeenOpened(true); // Set the state to true after the first click
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <div className="overflow-hidden rounded-md border border-red-600 bg-black">
          <div className="flex flex-col">
            <AccordionTrigger
              disabled={isPending}
              onClick={handleAccordionClick}
              className="border-b border-red-500 px-6"
            >
              <ChatHeader comment="Click here & Chat with Blacknet AI" />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col text-black">
                <ChatMessages
                  isLoading={isLoading}
                  className="flex-1 px-2 py-3"
                />
                <ChatInput
                  className="px-4"
                  isPendingParent={isPending}
                  onPendingChange={setIsLoading}
                />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
