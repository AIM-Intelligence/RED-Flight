import { cn } from "@/lib/utils";
import MarkdownLite from "../llm/components/MarkdownLite";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { useModal } from "@/store/use-modal-store";

import { prepareContractCall } from "thirdweb";
import { TransactionButton, useConnectedWallets } from "thirdweb/react";
import { getAllContracts } from "@/utils/contract";
import { useState } from "react";
import { approve } from "thirdweb/extensions/erc721";

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
  const parsedMessages = nftDetail.map((message: string) => JSON.parse(message)).reverse();

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
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black">
          <DialogHeader>
            <DialogTitle>Attack Prompt</DialogTitle>
          </DialogHeader>
          <div
            className={cn(
              "flex p-4 flex-col-reverse overflow-y-auto min-h-[400px] max-h-[360px] scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch gap-2 custom-scrollbar",
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
