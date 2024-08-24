import { useQuery } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { getUserPrompts } from "@/server/nft-prompt/select-promptNFT";
import { usePromptStore } from "@/store/prompt/prompt-select-store";
import { useWeb3UserStore } from "@/store/user-store";
import { Database } from "@/validation/types/supabase";

type PromptNFT = Database["public"]["Tables"]["prompt nft"]["Row"];

export function useSelectPrompt() {
  const { toast } = useToast();
  const { setPrompts } = usePromptStore();
  const { user } = useWeb3UserStore();

  return useQuery<PromptNFT[], Error>({
    queryKey: ["userPrompts"],
    queryFn: async () => {
      try {
        const prompts = await getUserPrompts();
        setPrompts(prompts);
        return prompts;
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
export function usePrompts() {
  return usePromptStore(state => state.prompts);
}

// Helper hook to get and set the selected prompt ID
export function useSelectedPrompt() {
  const selectedPromptId = usePromptStore(state => state.selectedPromptId);
  const setSelectedPromptId = usePromptStore(
    state => state.setSelectedPromptId,
  );
  const prompts = usePromptStore(state => state.prompts);

  const selectedPrompt = prompts.find(prompt => prompt.id === selectedPromptId);

  return {
    selectedPromptId,
    setSelectedPromptId,
    selectedPrompt,
  };
}
