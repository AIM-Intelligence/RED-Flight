import { create } from 'zustand';

type State = {
  count: number;
  increment: () => void;
  setCountToSeven: () => void;
  setCount: (newCount: number) => void;
};

export const useCount = create<State>((set) => ({
  count: 1,
  increment: () => set((state) => ({ count: state.count + 1 })),
  setCountToSeven: () => set({ count: 7 }),
  setCount: (newCount: number) => set({ count: newCount }),
}));
