import React, { useContext, useEffect } from 'react';

import { MessagesContext } from '@/context/Messages';
import useAssistGPTServer, {
  ContextMessage,
} from '@/hooks/getAIChatServer.tsx/useAssistGPTServer';
import useAssistGPTStore from '@/store/prompt/assist-prompt-store';

const AsisstAI = () => {
  const { messages: contextMessages } = useContext(MessagesContext);
  const { mutate, isPending } = useAssistGPTServer();
  const { messages: assistMessages, error } = useAssistGPTStore();

  useEffect(() => {
    if (
      contextMessages.length >= 2 &&
      !contextMessages[contextMessages.length - 1].isUserMessage
    ) {
      console.log('check');
      mutate(contextMessages as ContextMessage[]);
    }
  }, [contextMessages, mutate]);

  // Find the latest Assist AI message
  const latestAssistMessage =
    assistMessages.length > 0
      ? assistMessages[assistMessages.length - 1]
      : null;

  return (
    <div className="text-orange-500">
      <h2 className="mb-4 text-xl font-bold">Voice of an unknown person</h2>
      {isPending ? (
        <p>Analyzing conversation...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : latestAssistMessage ? (
        <div className="p-2">{latestAssistMessage.text}</div>
      ) : (
        <p>
          From now on, we will jailbreak the AI ​​that is programmed not to tell
          the password using a strategy called Role Playing. Role Playing Attack
          is one of the most popular and deadly AI jailbreaking techniques. Give
          the AI ​​a role that makes it tell the password naturally. For
          example, give it a personality that cannot refuse human requests, or
          assume a situation where it has no choice but to tell the password.
        </p>
      )}
    </div>
  );
};

export default AsisstAI;
