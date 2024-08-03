import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { MessagesContext } from "@/context/Messages";
import { Message } from "@/lib/validation/message";

const useAIChatServer = (
  firstTouch: boolean,
  textareaRef?: React.RefObject<HTMLTextAreaElement> | undefined,
  setInput?: (input: string) => void | undefined,
): { mutate: any; isPending: any } => {
  const { addMessage, removeMessage, updateMessage, setIsMessageUpdating, messages } = useContext(MessagesContext);

  return useMutation({
    mutationFn: async (_messages: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      console.log(_messages);

      return response.body;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async stream => {
      if (!stream) throw new Error("No stream found");

      // construct new message to add
      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: "",
      };

      // add new message to state
      addMessage(responseMessage);

      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();

        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, prev => prev + chunkValue);
      }

      // clean up
      setIsMessageUpdating(false);

      setTimeout(() => {
        textareaRef?.current?.focus();
      }, 10);

      if (!firstTouch) {
        setInput!("");
      }
    },
    onError: (_, message) => {
      if (!firstTouch) {
        textareaRef?.current?.focus();
      }
      removeMessage(message.id);
      textareaRef?.current?.focus();
    },
  });
};

export default useAIChatServer;
