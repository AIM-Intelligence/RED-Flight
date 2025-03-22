import { create } from 'zustand';

import { Database } from '@/validation/types/supabase';

type PromptNFT = Database['public']['Tables']['first-red']['Row'];

export type SheetType = 'showPromptDetail';

interface SheetData {
  prompt?: PromptNFT;
}

interface SheetStore {
  type: SheetType | null;
  data: SheetData;
  isOpen: boolean;
  onOpen: (type: SheetType, data?: SheetData) => void;
  onClose: () => void;
}

export const useSheet = create<SheetStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
