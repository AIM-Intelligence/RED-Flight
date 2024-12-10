import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toEther } from 'thirdweb';
import {
  claimTo,
  getActiveClaimCondition,
  getTotalClaimedSupply,
  nextTokenIdToMint,
} from 'thirdweb/extensions/erc721';
import {
  TransactionButton,
  useActiveAccount,
  useActiveWalletChain,
  useReadContract,
} from 'thirdweb/react';

import { Button } from '@/components/ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/Drawer';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form';
import { useNFTEnroll } from '@/hooks/prompt/useNFTEnroll';
import { useDrawer } from '@/store/use-drawer-store';
import { useModal } from '@/store/use-modal-store';
import { getAllContracts } from '@/utils/contract';
import { Input } from '../ui/AnimateButton';
import { toast } from '../ui/use-toast';

type FormData = {
  title: string;
  description: string;
};

export function NFTClaimDrawer() {
  const activeAccount = useActiveAccount();
  const [quantity, setQuantity] = React.useState(1);
  const { isOpen, onClose, type, data } = useDrawer();
  const { onClose: modalClose } = useModal();
  const [loading, setLoading] = React.useState(false);

  const { enrollNFT, isEnrolling, enrollError } = useNFTEnroll();

  console.log('enrollError', enrollError);
  //! Make error call Admin

  const form = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const isDrawerOpen = isOpen && type === 'showNFTClaimDrawer';

  const handleCloseDrawer = () => {
    if (loading || isEnrolling) {
      return null;
    }

    onClose();
  };

  const chain = useActiveWalletChain();

  const chainId = chain ? chain.id : 3441006;

  const { NFT_DROP_CONTRACT } = getAllContracts(chainId)!;

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
      quantity * parseInt(claimCondition?.pricePerToken.toString() || '0');
    return toEther(BigInt(total));
  };

  const remainingSupply = Number(totalNFTSupply) - Number(claimedSupply);

  function onQuantityChange(adjustment: number) {
    setQuantity((prevQuantity) =>
      Math.max(1, Math.min(remainingSupply, prevQuantity + adjustment))
    );
  }

  console.log('quantity', quantity);

  if (!activeAccount || !data.red_prompt) return;
  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseDrawer();
      }}
    >
      <DrawerContent className="border-red-600 bg-black">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <Form {...form}>
              <form className="space-y-4 p-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Title" {...field} maxLength={30} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Description"
                          {...field}
                          maxLength={100}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DrawerHeader>
          <div className="p-4 pb-0">
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
                <div className="text-7xl font-bold tracking-tighter text-white">
                  {quantity}
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
              <p className="text-white">Price: {getPrice(quantity)} ETH</p>
              <p className="text-white">
                Remaining: {remainingSupply} /{' '}
                {totalNFTSupply?.toString() || 'N/A'}
              </p>
            </div>
          </div>
          <DrawerFooter>
            <TransactionButton
              transaction={() =>
                claimTo({
                  contract: NFT_DROP_CONTRACT,
                  to: activeAccount.address,
                  quantity: BigInt(quantity),
                })
              }
              onTransactionSent={() => {
                setLoading(true);
                toast({
                  title: 'Claiming NFT',
                  description: 'Please wait for a moment...',
                });
              }}
              onTransactionConfirmed={async (tx) => {
                alert('NFT Claimed!');
                toast({
                  title: 'Processing claim results',
                  description: 'Please wait for a moment...',
                });

                setQuantity(0);
                const formData = form.getValues();

                console.log('Title:', formData.title);
                console.log('Description:', formData.description);
                console.log('TransactionHash:', tx.transactionHash);
                console.log('chainId:', chainId);
                console.log('promptId:', data.red_prompt!.id);

                await new Promise((resolve) => setTimeout(resolve, 1000));

                await enrollNFT({
                  transactionHash: tx.transactionHash,
                  chainId: chainId,
                  promptId: data.red_prompt!.id,
                  title: formData.title,
                  description: formData.description,
                });

                setLoading(false);
                onClose();
                modalClose();
                // router.refresh();
              }}
              onError={(err) => {
                alert(err.message);
              }}
              unstyled
              className="flex items-center justify-center rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
            >
              Claim NFT
            </TransactionButton>
            <DrawerClose asChild>
              <Button
                onClick={handleCloseDrawer}
                variant="outline"
                disabled={isEnrolling}
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
