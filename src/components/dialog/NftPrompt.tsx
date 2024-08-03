import { cn } from "@/lib/utils";
import MarkdownLite from "../llm/components/MarkdownLite";

const NFTPrompt = ({ nftPromptData }: any) => {
  console.log("nftPromptData", nftPromptData);

  if (!nftPromptData) {
    return <div>Loading NFT data...</div>;
  }

  // Parse the JSON strings and reverse the order
  const parsedMessages = nftPromptData.map((message: string) => JSON.parse(message)).reverse();

  console.log("parsedMessages", parsedMessages);

  return (
    <div
      className={cn(
        "absolute -translate-y-1/2 -translate-x-1/2 flex bg-black p-4 flex-col-reverse overflow-y-auto min-h-[400px] max-h-[360px] scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch gap-2 custom-scrollbar",
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
              className={cn("flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden", {
                "order-1 items-end": message.isUserMessage,
                "order-2 items-start": !message.isUserMessage,
              })}
            >
              <p
                className={cn("px-4 py-2 rounded-lg", {
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
