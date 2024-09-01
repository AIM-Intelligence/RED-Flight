import { create } from "zustand";

import { Database } from "@/validation/types/supabase";

type RED_Prompt = Database["public"]["Tables"]["red prompt nft"]["Row"];

export type DrawerType = "showNFTClaimDrawer";

interface DrawerData {
  red_prompt?: RED_Prompt;
}

interface DrawerStore {
  type: DrawerType | null;
  data: DrawerData;
  isOpen: boolean;
  onOpen: (type: DrawerType, data?: DrawerData) => void;
  onClose: () => void;
}

export const useDrawer = create<DrawerStore>(set => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
