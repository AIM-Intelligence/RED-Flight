import React, { useEffect, useRef, useState } from "react";

import MarkdownLite from "../llm/components/MarkdownLite";
import { toEther } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import {
  getActiveClaimCondition,
  getTotalClaimedSupply,
  nextTokenIdToMint,
} from "thirdweb/extensions/erc721";
import { useActiveWalletChain, useReadContract } from "thirdweb/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import { useModal } from "@/store/use-modal-store";
import { getAllContracts } from "@/utils/contract";

interface Message {
  id: string;
  text: string;
  isUserMessage: boolean;
}

const RedPromptModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [parsedMessages, setParsedMessages] = useState<Message[]>([]);
  const isModalOpen = isOpen && type === "showRedPromptData";
  const scrollRef = useRef<HTMLDivElement>(null);

  const chain = useActiveWalletChain();

  const chainId = chain ? chain.id : 3441006;

  const { NFT_DROP_CONTRACT } = getAllContracts(chainId)!;

  const { data: contractMetadata } = useReadContract(getContractMetadata, {
    contract: NFT_DROP_CONTRACT,
    queryOptions: {
      enabled: !!NFT_DROP_CONTRACT,
    },
  });

  const { data: claimedSupply } = useReadContract(getTotalClaimedSupply, {
    contract: NFT_DROP_CONTRACT,
    queryOptions: {
      enabled: !!NFT_DROP_CONTRACT,
    },
  });

  const { data: totalNFTSupply } = useReadContract(nextTokenIdToMint, {
    contract: NFT_DROP_CONTRACT,
    queryOptions: {
      enabled: !!NFT_DROP_CONTRACT,
    },
  });

  const { data: claimCondition } = useReadContract(getActiveClaimCondition, {
    contract: NFT_DROP_CONTRACT,
    queryOptions: {
      enabled: !!NFT_DROP_CONTRACT,
    },
  });

  const getPrice = (quantity: number) => {
    const total =
      quantity * parseInt(claimCondition?.pricePerToken.toString() || "0");
    return toEther(BigInt(total));
  };

  console.log("contractMetadata", contractMetadata);
  console.log("claimedSupply", claimedSupply); // 0
  console.log("totalNFTSupply", totalNFTSupply); // 31
  console.log("claimCondition", claimCondition);
  console.log("getPrice", getPrice);

  console.log("data.red_prompt", data.red_prompt);

  useEffect(() => {
    if (data && data.red_prompt) {
      try {
        let messages: Message[];
        if (typeof data.red_prompt.prompt === "string") {
          messages = JSON.parse(data.red_prompt.prompt);
        } else {
          throw new Error("Invalid red_prompt format");
        }

        if (Array.isArray(messages) && messages.every(isValidMessage)) {
          setParsedMessages(messages);
        } else {
          throw new Error("Invalid message format");
        }
      } catch (error) {
        console.error("Error parsing red_prompt data:", error);
        setParsedMessages([]);
      }
    } else {
      setParsedMessages([]);
    }
  }, [data]);

  useEffect(() => {
    if (isModalOpen && scrollRef.current) {
      setTimeout(() => {
        const scrollElement = scrollRef.current;
        scrollElement?.scrollTo({
          top: scrollElement.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [isModalOpen, parsedMessages]);

  function isValidMessage(message: any): message is Message {
    return (
      typeof message === "object" &&
      typeof message.id === "string" &&
      typeof message.text === "string" &&
      typeof message.isUserMessage === "boolean"
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-black sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Attack Prompt</DialogTitle>
        </DialogHeader>
        <div
          ref={scrollRef}
          className={cn(
            "scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch custom-scrollbar flex max-h-[360px] min-h-[400px] flex-col gap-2 overflow-y-auto p-4",
          )}
        >
          {parsedMessages.map(message => (
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
      </DialogContent>
    </Dialog>
  );
};

export default RedPromptModal;
