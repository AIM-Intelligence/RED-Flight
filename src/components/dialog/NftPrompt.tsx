import MarkdownLite from "../llm/components/MarkdownLite";

import { cn } from "@/lib/utils";

const NFTPrompt = ({ nftPromptData }: any) => {
  console.log("nftPromptData", nftPromptData);

  if (!nftPromptData) {
    return <div>Loading NFT data...</div>;
  }

  // Parse the JSON strings and reverse the order
  const parsedMessages = nftPromptData
    .map((message: string) => JSON.parse(message))
    .reverse();

  console.log("parsedMessages", parsedMessages);

  return (
    <div
      className={cn(
        "scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch custom-scrollbar absolute flex max-h-[360px] min-h-[400px] -translate-x-1/2 -translate-y-1/2 flex-col-reverse gap-2 overflow-y-auto bg-black p-4",
      )}
    >
      {parsedMessages.map((message: any) => (
        <div key={message.id} className="chat-message">
          <div
            className={cn("flex items-end", {
              "justify-end": message.isUserMessage,
            })}
          >
            <div
              className={cn(
                "mx-2 flex max-w-xs flex-col space-y-2 overflow-x-hidden text-sm",
                {
                  "order-1 items-end": message.isUserMessage,
                  "order-2 items-start": !message.isUserMessage,
                },
              )}
            >
              <p
                className={cn("rounded-lg px-4 py-2", {
                  "bg-red-600 text-white": message.isUserMessage,
                  "bg-gray-200 text-gray-900": !message.isUserMessage,
                })}
              >
                <MarkdownLite text={message.text} />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTPrompt;
