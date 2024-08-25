import * as React from "react";

import { Minus, Plus } from "lucide-react";
import { toEther } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import {
  getActiveClaimCondition,
  getTotalClaimedSupply,
  nextTokenIdToMint,
} from "thirdweb/extensions/erc721";
import {
  MediaRenderer,
  useActiveWalletChain,
  useReadContract,
} from "thirdweb/react";

import { Button } from "@/components/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { client } from "@/lib/client";
import { useDrawer } from "@/store/use-drawer-store";
import { getAllContracts } from "@/utils/contract";

export function NFTClaimDrawer() {
  const [quantity, setQuantity] = React.useState(1);
  const { isOpen, onClose, type, data } = useDrawer();

  console.log("drawing data", data);
  const isDrawerOpen = isOpen && type === "showNFTClaimDrawer";

  const handleCloseDrawer = () => {
    onClose();
  };

  const chain = useActiveWalletChain();
  const chainId = chain ? chain.id : 3441006;
  const { NFT_DROP_CONTRACT } = getAllContracts(chainId)!;

  const { data: contractMetadata, isPending: isContractMetadataLoading } =
    useReadContract(getContractMetadata, {
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

  const remainingSupply =
    totalNFTSupply && claimedSupply
      ? Number(totalNFTSupply - claimedSupply)
      : 0;

  function onQuantityChange(adjustment: number) {
    setQuantity(prevQuantity =>
      Math.max(1, Math.min(remainingSupply, prevQuantity + adjustment)),
    );
  }

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={open => {
        if (!open) handleCloseDrawer();
      }}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {contractMetadata?.name || "RED Flight Drop NFT"}
            </DrawerTitle>
            <DrawerDescription>
              {contractMetadata?.description ||
                "Claim your RED Flight Drop NFT"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {isContractMetadataLoading ? (
              <p>Loading...</p>
            ) : (
              <MediaRenderer
                client={client}
                src={contractMetadata?.image}
                className="rounded-xl"
              />
            )}
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {quantity}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  NFTs to claim
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onQuantityChange(1)}
                disabled={quantity >= remainingSupply}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 text-center">
              <p>Price: {getPrice(quantity)} ETH</p>
              <p>
                Remaining: {remainingSupply} /{" "}
                {totalNFTSupply?.toString() || "N/A"}
              </p>
              <p>Symbol: {contractMetadata?.symbol || "RFSN"}</p>
            </div>
          </div>
          <DrawerFooter>
            <Button
              onClick={() => {
                /* Implement claim logic here */
                console.log(`Claiming ${quantity} NFTs`);
              }}
            >
              Claim NFT
            </Button>
            <DrawerClose asChild>
              <Button onClick={handleCloseDrawer} variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
