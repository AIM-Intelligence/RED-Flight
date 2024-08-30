import { create } from "zustand";

import { Database } from "@/validation/types/supabase";

type PromptNFT = Omit<
  Database["public"]["Tables"]["red prompt nft"]["Row"],
  "id" | "prompt"
>;

interface PromptStore {
  allPrompts: PromptNFT[];
  setAllPrompts: (allPrompts: PromptNFT[]) => void;
}

export const useAllPromptStore = create<PromptStore>(set => ({
  allPrompts: [],
  setAllPrompts: allPrompts => set({ allPrompts }),
}));
