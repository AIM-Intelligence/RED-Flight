import { createContext, useState } from "react";

import { nanoid } from "nanoid";

import { Message } from "@/validation/message";

const defaultValue = [
  {
    id: nanoid(),
    text: "Heartbeat synchronization complete... Hello my Heart..",
    isUserMessage: false,
  },
];
export const MessagesContext = createContext<{
  messages: Message[];
  isMessageUpdating: boolean;
  codeFound: boolean;
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
  setCodeFound: (found: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  codeFound: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
  setCodeFound: () => {},
});

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState(defaultValue);
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);
  const [codeFound, setCodeFound] = useState<boolean>(false);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string,
  ) => {
    setMessages(prev =>
      prev.map(message => {
        if (message.id === id) {
          return { ...message, text: updateFn(message.text) };
        }
        return message;
      }),
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessageUpdating,
        codeFound,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
        setCodeFound,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
