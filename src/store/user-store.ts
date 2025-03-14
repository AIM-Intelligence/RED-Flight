import { create } from 'zustand';

import { Database } from '@/validation/types/supabase';

type Web3User = Database['public']['Tables']['user']['Row'];

interface Web3UserState {
  user: Web3User | null;
  setUser: (user: Web3User | null) => void;
  updateUser: (updates: Partial<Web3User>) => void;
  clearUser: () => void;
}

export const useWeb3UserStore = create<Web3UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
  clearUser: () => set({ user: null }),
}));
