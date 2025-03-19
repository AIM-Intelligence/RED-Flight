import { useQuery } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';
import { getUserFirstRedPrompts } from '@/server/nft-prompt/select-my-red';
import { Database } from '@/validation/types/supabase';

// Define the type that will be returned from the server function
type FirstRed = Database['public']['Tables']['first red']['Row'];

export function useGetMyFirstRed() {
  const { toast } = useToast();

  return useQuery<FirstRed[], Error>({
    queryKey: ['userFirstRed'],
    queryFn: async () => {
      try {
        return await getUserFirstRedPrompts();
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
  });
}
