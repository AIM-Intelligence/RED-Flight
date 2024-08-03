"use client";

import { useRef, useState } from "react";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { Textarea } from "@/components/ui/Textarea";

import useAIChatServer from "@/hooks/getAIChatServer.tsx/useGPTChatServer";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/validation/message";

const ChatInput = ({ isPendingParent }: any, { className, ...props }: any) => {
  const [input, setInput] = useState<string>("");
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  const firstTouch = false;

  const { mutate: sendMessage, isPending } = useAIChatServer(firstTouch, textareaRef, setInput);

  return (
    <div {...props} className={cn("border-t border-red-500", className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <Textarea
          ref={textareaRef}
          disabled={isPending || isPendingParent}
          rows={3}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              const message: Message = {
                id: nanoid(),
                isUserMessage: true,
                text: input,
              };

              sendMessage(message);
            }
          }}
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={
            isPending || isPendingParent
              ? "Waiting for an answer from AI."
              : "Launch crafty, creative attacks that security filters can't catch."
          }
          className="peer disabled:opacity-50 placeholder:text-gray-400 resize-none block w-full border-0 bg-black py-1.5 text-gray-200 focus:ring-0 text-sm sm:leading-6"
        />

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border bg-black border-red-500 px-1 text-xs text-gray-400">
            {isPending || isPendingParent ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <CornerDownLeft className="w-3 h-3 text-red-500" />
            )}
          </kbd>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-red-600"
        />
      </div>
    </div>
  );
};

export default ChatInput;
