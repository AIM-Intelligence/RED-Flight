import { create } from "zustand";

export interface Message {
  id: string;
  text: string;
  "victim ai"?: boolean;
  user?: boolean;
  "assist ai"?: boolean;
}

interface AssistGPTState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const useAssistGPTStore = create<AssistGPTState>(set => ({
  messages: [],
  isLoading: false,
  error: null,
  addMessage: message =>
    set(state => ({ messages: [...state.messages, message] })),
  setMessages: messages => set({ messages }),
  setIsLoading: isLoading => set({ isLoading }),
  setError: error => set({ error }),
}));

export default useAssistGPTStore;
