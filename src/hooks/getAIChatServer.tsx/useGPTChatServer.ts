import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

import { toast } from '@/components/ui/use-toast';
import { MessagesContext } from '@/context/Messages';
import useNFTStore from '@/store/prompt/prompt-insert-store';
import { Message } from '@/validation/message';

const useAIChatServer = (
  firstTouch: boolean,
  textareaRef?: React.RefObject<HTMLTextAreaElement | null> | undefined,
  setInput?: (input: string) => void | undefined
) => {
  const { inputNFT } = useNFTStore();

  const {
    addMessage,
    removeMessage,
    setIsMessageUpdating,
    messages,
    setCodeFound,
  } = useContext(MessagesContext);

  return useMutation({
    mutationFn: async (message: Message) => {
      setIsMessageUpdating(true);
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, message], inputNFT }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || 'An error occurred';
        alert(errorMessage);
        window.location.reload();
        throw new Error(errorMessage);
      }

      return data;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (data) => {
      const responseMessage: Message = {
        id: nanoid(),
        isUserMessage: false,
        text: data.result,
      };

      addMessage(responseMessage);

      setIsMessageUpdating(false);

      if (data.codeFound) {
        setCodeFound(true);
      }

      setTimeout(() => {
        textareaRef?.current?.focus();
      }, 10);

      if (!firstTouch) {
        setInput?.('');
      }
    },
    onError: (error: Error, message) => {
      removeMessage(message.id);
      setIsMessageUpdating(false);
      if (!firstTouch) {
        textareaRef?.current?.focus();
      }

      toast({
        title: 'Error',
        description:
          error.message || 'An error occurred while processing your request.',
        variant: 'destructive',
      });
    },
  });
};

export default useAIChatServer;
