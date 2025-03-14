import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IntroState {
  hasSeenIntro: boolean;
  setHasSeenIntro: (value: boolean) => void;
}

export const useIntroStore = create<IntroState>()(
  persist(
    (set) => ({
      hasSeenIntro: false,
      setHasSeenIntro: (value) => set({ hasSeenIntro: value }),
    }),
    {
      name: 'intro-storage',
    }
  )
);
