import { create } from 'zustand';

import { ImageRankWithUser } from '@/server/rank/select-imageRank';

interface ImageRankStore {
  topThreeImages: ImageRankWithUser[];
  setTopThreeImages: (topThreeImages: ImageRankWithUser[]) => void;

  imageRankArr: ImageRankWithUser[];
  setImageRankArr: (imageRankArr: ImageRankWithUser[]) => void;
}

export const useImageRankStore = create<ImageRankStore>((set) => ({
  topThreeImages: [],
  setTopThreeImages: (topThreeImages) => set({ topThreeImages }),

  imageRankArr: [],
  setImageRankArr: (imageRankArr) => set({ imageRankArr }),
}));
