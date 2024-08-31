import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import { toast } from "@/components/ui/use-toast";
import useAssistGPTStore from "@/store/prompt/assist-prompt-store";

export interface Message {
  id: string;
  text: string;
  "victim ai"?: boolean;
  user?: boolean;
  "assist ai"?: boolean;
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
        // Use the messages from the store when contextMessages length exceeds 8

        reconstructedMessages = messages.map(msg => ({
          id: msg.id,
          text: msg.text,
          "victim ai": msg["victim ai"] || false,
          user: msg.user || false,
          "assist ai": msg["assist ai"] || false,
        }));
      } else {
        // Use the provided contextMessages when length is 8 or less
        reconstructedMessages = contextMessages.map(msg => ({
          id: msg.id,
          text: msg.text,
          "victim ai": !msg.isUserMessage && !msg.isAssistAI,
          user: msg.isUserMessage,
          "assist ai": msg.isAssistAI || false,
        }));
      }

      setMessages(reconstructedMessages);

      const response = await fetch("/api/assist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: reconstructedMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API request failed");
      }

      return response.json();
    },
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: (data: { result: string }) => {
      const assistMessage: Message = {
        id: nanoid(),
        text: data.result,
        "victim ai": false,
        user: false,
        "assist ai": true,
      };
      addMessage(assistMessage);
      setIsLoading(false);
    },
    onError: (error: Error) => {
      setError(error.message);
      setIsLoading(false);
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while processing your request.",
        variant: "destructive",
      });
    },
  });
};

export default useAssistGPTServer;
