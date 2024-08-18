import { create } from "zustand";

// Supabase에 입력할 NFT 인터페이스 정의
interface PromptNFTInput {
  level: number;
}

// Store 인터페이스 정의
interface InputPromptNFTStore {
  inputNFT: PromptNFTInput;
  updateInputNFT: (updates: Partial<PromptNFTInput>) => void;
  resetInputNFT: () => void;
}

// 초기 NFT 상태
const initialNFT: PromptNFTInput = {
  level: 1,
};

// Zustand store 생성
const useNFTStore = create<InputPromptNFTStore>(set => ({
  inputNFT: initialNFT,
  updateInputNFT: updates =>
    set(state => ({ inputNFT: { ...state.inputNFT, ...updates } })),
  resetInputNFT: () => set({ inputNFT: initialNFT }),
}));

export default useNFTStore;
