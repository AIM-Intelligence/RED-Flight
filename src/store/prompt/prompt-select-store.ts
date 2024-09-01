import { create } from "zustand";

import { Database } from "@/validation/types/supabase";

type PromptNFT = Database["public"]["Tables"]["red prompt nft"]["Row"];

interface PromptStore {
  prompts: PromptNFT[];
  setPrompts: (prompts: PromptNFT[]) => void;
  nfts: PromptNFT[];
  setNFTs: (nfts: PromptNFT[]) => void;
  selectedPromptId: string | null;
  setSelectedPromptId: (id: string | null) => void;
}

export const usePromptStore = create<PromptStore>(set => ({
  prompts: [],
  setPrompts: prompts => set({ prompts }),
  nfts: [],
  setNFTs: nfts => set({ nfts }),
  selectedPromptId: null,
  setSelectedPromptId: id => set({ selectedPromptId: id }),
}));
