import { useQuery } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { getUserRank } from "@/server/user-rank/select-userRank";
import { useUserRankStore } from "@/store/user-rank-store";
import { useWeb3UserStore } from "@/store/user-store";

// import { Database } from "@/validation/types/supabase";

type User = {
  id: string;
  image_url: string;
  name: string;
  wallet_address: string;
  score: number;
  easy: number;
  normal: number;
  hard: number;
  extreme: number;
  rank: number;
};
// type User = Database["public"]["Tables"]["user"]["Row"]

export function useUserRank() {
  const { toast } = useToast();
  const { setTopThreeArr, setUserRankArr } = useUserRankStore();
  const { user } = useWeb3UserStore();

  return useQuery<User[], Error>({
    queryKey: ["userRanks"],
    queryFn: async () => {
      try {
        const userRankArr = await getUserRank();

        const topThree = userRankArr.slice(0, 3);
        const remain = userRankArr.slice(3);

        setTopThreeArr(topThree);
        setUserRankArr(remain);
        return userRankArr;
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "An unknown error occurred",
            variant: "destructive",
          });
        }
        throw error;
      }
    },
    retry: false,
    enabled: !!user,
  });
}

// Helper hook to get prompts from the store
export function useUserRanks() {
  return useUserRankStore(state => state.userRankArr);
}

export function useTopThree() {
  return useUserRankStore(state => state.topThreeArr);
}
