import { useQuery } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';
import { getUserRank } from '@/server/user-rank/select-userRank';
import { useUserRankStore } from '@/store/user-rank-store';
import { Database } from '@/validation/types/supabase';

type User = Database['public']['Tables']['user']['Row'];

export function useUserRank() {
  const { toast } = useToast();
  const { setTopThreeArr, setUserRankArr } = useUserRankStore();

  return useQuery<User[], Error>({
    queryKey: ['userRanks'],
    queryFn: async () => {
      try {
        const userArr = await getUserRank();

        const topThree = userArr.slice(0, 3);
        const remain = userArr.slice(3);

        setTopThreeArr(topThree);
        setUserRankArr(remain);
        return userArr;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';

        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });

        throw error;
      }
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

// Helper hook to get prompts from the store
export function useUserRanks() {
  return useUserRankStore((state) => state.userRankArr);
}

export function useTopThree() {
  return useUserRankStore((state) => state.topThreeArr);
}
