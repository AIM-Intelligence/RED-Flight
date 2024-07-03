import { create } from "zustand";

// NFT 인터페이스 정의
interface NFT {
  title: string;
  desc: string;
  story: string;
  difficulty: number;
  conversation: number;
  length: number;
  target: string;
}

// Store 인터페이스 정의
interface NFTStore {
  nft: NFT;
  updateNFT: (updates: Partial<NFT>) => void;
  resetNFT: () => void;
}

// 초기 NFT 상태
const initialNFT: NFT = {
  title: "",
  desc: "",
  story: "",
  difficulty: 1,
  conversation: 0,
  length: 0,
  target: "",
};

// Zustand store 생성
const useNFTStore = create<NFTStore>(set => ({
  nft: initialNFT,
  updateNFT: updates => set(state => ({ nft: { ...state.nft, ...updates } })),
  resetNFT: () => set({ nft: initialNFT }),
}));

export default useNFTStore;
