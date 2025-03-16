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

// Helper hook to get prompts from the store
export function useUserRanks() {
  return useUserRankStore((state) => state.userRankArr);
}

export function useTopThree() {
  return useUserRankStore((state) => state.topThreeArr);
}
