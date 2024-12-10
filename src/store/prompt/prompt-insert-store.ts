import { create } from 'zustand';

interface PromptNFTInput {
  level: number;
}

interface InputPromptNFTStore {
  inputNFT: PromptNFTInput;
  updateInputNFT: (updates: Partial<PromptNFTInput>) => void;
  resetInputNFT: () => void;
}

const initialNFT: PromptNFTInput = {
  level: 1,
};

const useNFTStore = create<InputPromptNFTStore>((set) => ({
  inputNFT: initialNFT,
  updateInputNFT: (updates) =>
    set((state) => ({ inputNFT: { ...state.inputNFT, ...updates } })),
  resetInputNFT: () => set({ inputNFT: initialNFT }),
}));

export default useNFTStore;
