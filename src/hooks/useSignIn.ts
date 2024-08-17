// Adjust the import path as needed
import { useEffect } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Adjust the import path as needed
import { useToast } from "@/components/ui/use-toast";
import { getOrCreateWeb3User } from "@/server/auth/sign-in";
// Adjust the import path based on your shadcn setup
import { useWeb3UserStore } from "@/store/user-store";
import { Tables } from "@/validation/types/supabase";

// Adjust the import path as needed

type User = Tables<"user">;

export function useWeb3User() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setUser, clearUser } = useWeb3UserStore();

  const query = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: getOrCreateWeb3User,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
    } else if (query.isError) {
      // toast({
      //   title: "Error",
      //   description: query.error.message || "Failed to fetch user data",
      //   variant: "destructive",
      // });
      clearUser();
    }
  }, [
    query.isSuccess,
    query.isError,
    query.data,
    query.error,
    setUser,
    clearUser,
    toast,
  ]);

  const mutation = useMutation<User, Error, void, unknown>({
    mutationFn: getOrCreateWeb3User,
    onSuccess: data => {
      queryClient.setQueryData(["web3User"], data);
      setUser(data);
      toast({
        title: "Success",
        description: "User data updated successfully",
      });
    },
    onError: error => {
      console.log(error);
      // toast({
      //   title: "Error",
      //   description: error.message || "Failed to update user data",
      //   variant: "destructive",
      // });
    },
  });

  const refreshUser = async (): Promise<void> => {
    await mutation.mutateAsync();
  };

  return {
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
    refreshUser,
  };
}
