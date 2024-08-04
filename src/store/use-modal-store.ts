import { create } from "zustand";

export type ModalType =
  | "showPromptData"
  | "showUserInfoEdit"
  | "showUserInfoEditcopy"
  | "showUserInfoEditImage";

interface ModalData {
  nftDetail?: any;
  userInfo?: any;
  id?: any;
  stakedInfo?: any;
  refetchStakedInfo?: any;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
