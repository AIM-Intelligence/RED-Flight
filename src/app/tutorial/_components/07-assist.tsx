import React, { useContext, useEffect } from "react";

import { MessagesContext } from "@/context/Messages";
import useAssistGPTServer, {
  ContextMessage,
} from "@/hooks/getAIChatServer.tsx/useAssistGPTServer";
import useAssistGPTStore from "@/store/prompt/assist-prompt-store";

const AsisstAI = () => {
  const { messages: contextMessages } = useContext(MessagesContext);
  const { mutate, isPending } = useAssistGPTServer();
  const { messages: assistMessages, error } = useAssistGPTStore();

  useEffect(() => {
    if (
      contextMessages.length >= 6 &&
      !contextMessages[contextMessages.length - 1].isUserMessage
    ) {
      console.log("check");
      mutate(contextMessages as ContextMessage[]);
    }
  }, [contextMessages, mutate]);

  // Find the latest Assist AI message
  const latestAssistMessage =
    assistMessages.length > 0
      ? assistMessages[assistMessages.length - 1]
      : null;

  return (
    <div className="rounded-lg text-blue-500">
      <h2 className="mb-4 text-xl font-bold">Assist AI Feedback</h2>
      {isPending ? (
        <p>Analyzing conversation...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : latestAssistMessage ? (
        <div className="rounded bg-blue-100 p-4">
          <strong>Assist AI:</strong> {latestAssistMessage.text}
        </div>
      ) : (
        <p>Waiting for enough context to provide feedback...</p>
      )}
    </div>
  );
};

export default AsisstAI;
