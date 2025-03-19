import { useQuery } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';
import { getUserNFTs } from '@/server/nft-prompt/select-promptNFT';
import { usePromptStore } from '@/store/prompt/prompt-select-store';
import { Database } from '@/validation/types/supabase';

type PromptNFT = Database['public']['Tables']['red prompt nft']['Row'];

export function useSelectNFT() {
  const { toast } = useToast();
  const { setNFTs } = usePromptStore();

  return useQuery<PromptNFT[], Error>({
    queryKey: ['userNFTs'],
    queryFn: async () => {
      try {
        const nfts = await getUserNFTs();
        setNFTs(nfts);
        return nfts;
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: 'An unknown error occurred',
            variant: 'destructive',
          });
        }
        throw error;
      }
    },
    retry: false,
  });
}

// Helper hook to get prompts from the store
export function useNFTs() {
  return usePromptStore((state) => state.nfts);
}
