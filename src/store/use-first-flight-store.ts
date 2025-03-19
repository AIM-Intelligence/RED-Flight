import { create } from 'zustand';

interface ImageState {
  imageUrl: string | null;
  result: string | null;
  hasBird: boolean | null;
  isProcessing: boolean;
  error: Error | null;
  setImageUrl: (url: string | null) => void;
  setResult: (result: string | null) => void;
  setHasBird: (hasBird: boolean | null) => void;
  setProcessing: (isProcessing: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export const useImageStore = create<ImageState>((set) => ({
  imageUrl: null,
  result: null,
  hasBird: null,
  isProcessing: false,
  error: null,
  setImageUrl: (url) => set({ imageUrl: url }),
  setResult: (result) => set({ result }),
  setHasBird: (hasBird) => set({ hasBird }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      imageUrl: null,
      result: null,
      hasBird: null,
      isProcessing: false,
      error: null,
    }),
}));
