import { useQuery } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';
import { getAllPrompts } from '@/server/nft-prompt/select-allPrompt';
import { useAllPromptStore } from '@/store/prompt/prompt-all-store';
import { Database } from '@/validation/types/supabase';

type PromptNFT = Omit<
  Database['public']['Tables']['red prompt nft']['Row'],
  'id' | 'prompt'
>;

export function useAllPrompt() {
  const { toast } = useToast();
  const { setAllPrompts } = useAllPromptStore();

  return useQuery<PromptNFT[], Error>({
    queryKey: ['allPrompts'],
    queryFn: async () => {
      try {
        const prompts = await getAllPrompts();
        setAllPrompts(prompts);
        return prompts;
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
export function useAllPrompts() {
  return useAllPromptStore((state) => state.allPrompts);
}
