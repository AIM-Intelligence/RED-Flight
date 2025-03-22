import { create } from 'zustand';

interface ImageState {
  imageUrl: string | null;
  result: string | null;
  goStraight: boolean | null;
  isProcessing: boolean;
  error: Error | null;
  similarityPercentage: number | null;
  updatedScore: number | null;
  setImageUrl: (url: string | null) => void;
  setResult: (result: string | null) => void;
  setGoStraight: (goStraight: boolean | null) => void;
  setProcessing: (isProcessing: boolean) => void;
  setError: (error: Error | null) => void;
  setSimilarityPercentage: (percentage: number | null) => void;
  setUpdatedScore: (score: number | null) => void;
  reset: () => void;
}

export const useImageStore = create<ImageState>((set) => ({
  imageUrl: null,
  result: null,
  goStraight: null,
  isProcessing: false,
  error: null,
  similarityPercentage: null,
  updatedScore: null,
  setImageUrl: (url) => set({ imageUrl: url }),
  setResult: (result) => set({ result }),
  setGoStraight: (goStraight) => set({ goStraight }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setError: (error) => set({ error }),
  setSimilarityPercentage: (similarityPercentage) =>
    set({ similarityPercentage }),
  setUpdatedScore: (updatedScore) => set({ updatedScore }),
  reset: () =>
    set({
      imageUrl: null,
      result: null,
      goStraight: null,
      isProcessing: false,
      error: null,
      similarityPercentage: null,
      updatedScore: null,
    }),
}));
