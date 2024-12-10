import { create } from 'zustand';

import { Database } from '@/validation/types/supabase';

type REDUser = Database['public']['Tables']['user']['Row'];
type RED_Prompt = Database['public']['Tables']['red prompt nft']['Row'];

export type ModalType =
  | 'showRedPromptData'
  | 'showRedNFTPromptData'
  | 'showUserInfoEdit';

interface ModalData {
  user_info?: REDUser;
  red_prompt?: RED_Prompt;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
