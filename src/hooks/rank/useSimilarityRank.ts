import { useQuery } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';
import {
  getTopImagesByPixelSimilarity,
  ImageRankWithUser,
} from '@/server/rank/select-imageRank';
import { useImageRankStore } from '@/store/use-image-rank-store';

export function useSimilarityRank(limit = 50) {
  const { toast } = useToast();
  const { setTopThreeImages, setImageRankArr } = useImageRankStore();

  return useQuery<ImageRankWithUser[], Error>({
    queryKey: ['imageSimilarityRanks', limit],
    queryFn: async () => {
      try {
        const imageArr = await getTopImagesByPixelSimilarity(limit);

        console.log('imageArr', imageArr);

        const topThree = imageArr.slice(0, 3);
        const remain = imageArr.slice(3);

        setTopThreeImages(topThree);
        setImageRankArr(remain);
        return imageArr;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';

        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });

        throw error;
      }
    },
    staleTime: 0,
    refetchOnMount: true,
  });
}

// Helper hook to get all images except top three from the store
export function useImageRanks() {
  return useImageRankStore((state) => state.imageRankArr);
}

// Helper hook to get top three images from the store
export function useTopThreeImages() {
  return useImageRankStore((state) => state.topThreeImages);
}
