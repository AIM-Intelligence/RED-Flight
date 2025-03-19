import { create } from 'zustand';

export type DrawerType = 'showNFTClaimDrawer';

interface DrawerData {}

interface DrawerStore {
  type: DrawerType | null;
  data: DrawerData;
  isOpen: boolean;
  onOpen: (type: DrawerType, data?: DrawerData) => void;
  onClose: () => void;
}

export const useDrawer = create<DrawerStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
