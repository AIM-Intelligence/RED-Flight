import { create } from "zustand";

export type DrawerType = "showRedPromptData";

interface DrawerData {
  red_prompt?: JSON;
}

interface DrawerStore {
  type: DrawerType | null;
  data: DrawerData;
  isOpen: boolean;
  onOpen: (type: DrawerType, data?: DrawerData) => void;
  onClose: () => void;
}

export const useModal = create<DrawerStore>(set => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
