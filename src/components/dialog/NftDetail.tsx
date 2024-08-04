import { useState } from "react";

import MarkdownLite from "../llm/components/MarkdownLite";
import { prepareContractCall } from "thirdweb";
import { approve } from "thirdweb/extensions/erc721";
import { TransactionButton, useConnectedWallets } from "thirdweb/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import { useModal } from "@/store/use-modal-store";
import { getAllContracts } from "@/utils/contract";

const NFTDetail = () => {
  const wallet = useConnectedWallets();
  const chainId = wallet[0]?.getChain()?.id ?? 7001;
  const { contract, STAKING_CONTRACT } = getAllContracts(chainId);

  const { isOpen, onClose, type, data } = useModal();
  const [isApproved, setIsApproved] = useState(false);
  const { nftDetail, id, refetchStakedInfo } = data;
  const isModalOpen = isOpen && type === "showPromptData";

  //console.log("nftPromptData", nftDetail);

  if (!nftDetail) {
    return <div>Loading NFT data...</div>;
  }

  // Parse the JSON strings and reverse the order
  const parsedMessages = nftDetail
    .map((message: string) => JSON.parse(message))
    .reverse();

  console.log("parsedMessages", parsedMessages);

  const handleStakeConfirmation = async () => {
    alert("Staked!");
    // Use optional chaining to safely call these functions
    //stakedInfo?.();
    refetchStakedInfo?.();

    // router.push("/my-staking-nft");
    onClose();
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white dark:bg-black sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Attack Prompt</DialogTitle>
          </DialogHeader>
          <div
            className={cn(
              "scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch custom-scrollbar flex max-h-[360px] min-h-[400px] flex-col-reverse gap-2 overflow-y-auto p-4",
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

          {!isApproved ? (
            <TransactionButton
              transaction={() =>
                approve({
                  contract: contract,
                  to: STAKING_CONTRACT.address as `0x${string}`,
                  tokenId: id,
                })
              }
              style={{
                width: "100%",
              }}
              onTransactionConfirmed={() => setIsApproved(true)}
            >
              Approve
            </TransactionButton>
          ) : (
            <TransactionButton
              transaction={() =>
                prepareContractCall({
                  contract: STAKING_CONTRACT,
                  method: "stake",
                  params: [[id]],
                })
              }
              onTransactionConfirmed={handleStakeConfirmation}
              style={{
                width: "100%",
              }}
            >
              Stake
            </TransactionButton>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NFTDetail;
