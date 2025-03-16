import { create } from 'zustand';

import { Database } from '@/validation/types/supabase';

type User = Database['public']['Tables']['user']['Row'];

interface UserRankStore {
  topThreeArr: User[];
  setTopThreeArr: (topThreeArr: User[]) => void;

  userRankArr: User[];
  setUserRankArr: (userRankArr: User[]) => void;
}

export const useUserRankStore = create<UserRankStore>((set) => ({
  topThreeArr: [],
  setTopThreeArr: (topThreeArr) => set({ topThreeArr }),

  userRankArr: [],
  setUserRankArr: (userRankArr) => set({ userRankArr }),
}));
