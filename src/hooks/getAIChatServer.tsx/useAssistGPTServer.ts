import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

import { toast } from '@/components/ui/use-toast';
import useAssistGPTStore from '@/store/prompt/assist-prompt-store';

export interface Message {
  id: string;
  text: string;
  'blacknet ai'?: boolean;
  user?: boolean;
  'assist ai'?: boolean;
}

export interface ContextMessage {
  id: string;
  text: string;
  isUserMessage: boolean;
  isAssistAI?: boolean;
}

const useAssistGPTServer = () => {
  const { addMessage, setIsLoading, setError, setMessages, messages } =
    useAssistGPTStore();

  return useMutation({
    mutationFn: async (contextMessages: ContextMessage[]) => {
      let reconstructedMessages: Message[];

      if (contextMessages.length > 7) {
        // Use the messages from the store when contextMessages length exceeds 7
        const lastTwoMessages = contextMessages.slice(-2).map((msg) => ({
          id: msg.id,
          text: msg.text,
          'blacknet ai': !msg.isUserMessage && !msg.isAssistAI,
          user: msg.isUserMessage,
          'assist ai': msg.isAssistAI || false,
        }));

        reconstructedMessages = [...messages, ...lastTwoMessages];
        setMessages(reconstructedMessages);
        //console.log("reconstructedMessages2", reconstructedMessages);
      } else {
        // Use the provided contextMessages when length is 7 or less
        reconstructedMessages = contextMessages.map((msg) => ({
          id: msg.id,
          text: msg.text,
          'blacknet ai': !msg.isUserMessage && !msg.isAssistAI,
          user: msg.isUserMessage,
          'assist ai': msg.isAssistAI || false,
        }));
        setMessages(reconstructedMessages);
        //console.log("reconstructedMessages1", reconstructedMessages);
      }

      const response = await fetch('/api/assist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: reconstructedMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }

      return response.json();
    },
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: (data: { result: string }) => {
      //text => result
      const assistMessage: Message = {
        id: nanoid(),
        text: data.result, // =text => result
        'blacknet ai': false,
        user: false,
        'assist ai': true,
      };
      addMessage(assistMessage);
      setIsLoading(false);
    },
    onError: (error: Error) => {
      setError(error.message);
      setIsLoading(false);
      toast({
        title: 'Error',
        description:
          error.message || 'An error occurred while processing your request.',
        variant: 'destructive',
      });
    },
  });
};

export default useAssistGPTServer;
