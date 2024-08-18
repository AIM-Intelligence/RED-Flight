import { useCallback } from "react";

import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "@/components/ui/use-toast";
import { getOrCreateWeb3User } from "@/server/auth/sign-in";
import { useWeb3UserStore } from "@/store/user-store";
import { Tables } from "@/validation/types/supabase";

type User = Tables<"user">;

export function useWeb3User() {
  const queryClient = useQueryClient();
  const { setUser, clearUser } = useWeb3UserStore();
  const isFetching = useIsFetching({ queryKey: ["web3User"] });

  const mutation = useMutation({
    mutationFn: getOrCreateWeb3User,
    onSuccess: (data: User) => {
      queryClient.setQueryData(["web3User"], data);
      setUser(data);
      toast({
        title: "Success",
        description: "User data updated successfully",
      });
    },
    onError: (error: Error) => {
      console.log(error);
      clearUser();
      toast({
        title: "Error",
        description: error.message || "Failed to update user data",
        variant: "destructive",
      });
    },
  });

  const refreshUser = useCallback(async (): Promise<void> => {
    await mutation.mutateAsync();
  }, [mutation]);

  return {
    isLoading: mutation.isPending || isFetching > 0,
    isError: mutation.isError,
    error: mutation.error,
    refreshUser,
  };
}
