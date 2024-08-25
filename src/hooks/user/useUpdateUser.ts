import { useCallback } from "react";

import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/ui/use-toast";
import { updateUserProfile } from "@/server/auth/update-user";
import { useWeb3UserStore } from "@/store/user-store";
import { Tables } from "@/validation/types/supabase";

type User = Tables<"user">;

type UpdateUserParams = {
  name: string | null;
  description: string | null;
  email: string | null;
  imageUrl: string | null;
};

export function useUpdateWeb3User() {
  const { setUser } = useWeb3UserStore();

  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data: User) => {
      setUser(data);
      toast({
        title: "Success",
        description: "User profile updated successfully",
      });
    },
    onError: (error: Error) => {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to update user profile",
        variant: "destructive",
      });
    },
  });

  const updateUser = useCallback(
    async (params: UpdateUserParams): Promise<void> => {
      await updateMutation.mutateAsync(params);
    },
    [updateMutation],
  );

  return {
    updateUser,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}
