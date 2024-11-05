import { useCallback } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/ui/use-toast";
import { updateREDPrompt } from "@/server/nft-prompt/enroll-nft";

type NFTClaim = {
  transactionHash: string;
  chainId: number;
  promptId: string;
  title: string;
  description: string;
};

export function useNFTEnroll() {
  const queryClient = useQueryClient();

  const enrollMutation = useMutation({
    mutationFn: updateREDPrompt,
    onSuccess: data => {
      if (data.success) {
        toast({
          title: "Success",
          description: "NFT enrolled successfully",
        });
        queryClient.invalidateQueries({ queryKey: ["userNFTs"] });
        queryClient.invalidateQueries({ queryKey: ["userPrompts"] });
      } else {
        toast({
          title: "Warning",
          description: "NFT enrollment completed, but with issues",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      console.error("NFT enrollment error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to enroll NFT",
        variant: "destructive",
      });
    },
  });

  const enrollNFT = useCallback(
    async (params: NFTClaim): Promise<void> => {
      await enrollMutation.mutateAsync(params);
    },
    [enrollMutation],
  );

  return {
    enrollNFT,
    isEnrolling: enrollMutation.isPending,
    enrollError: enrollMutation.error,
  };
}
