'use client';

import SimilarityLeaderboardTable from '@/components/table/similarity-leaderboard-table';
import Error from '@/app/error';
import Loading from '@/app/loading';
import {
  useImageRanks,
  useSimilarityRank,
  useTopThreeImages,
} from '@/hooks/rank/useSimilarityRank';

const Page = () => {
  const { error, isLoading } = useSimilarityRank();
  const topThreeImages = useTopThreeImages();
  const imageRanks = useImageRanks();

  if (isLoading) return <Loading />;
  if (error) {
    return (
      <Error
        message={
          error instanceof Error
            ? error.message
            : 'Error loading image similarity leaderboard data'
        }
      />
    );
  }

  return (
    <div className="custom-scrollbar mx-auto flex h-screen w-screen flex-col justify-start gap-8 overflow-y-auto py-20">
      <div className="mx-auto w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        <SimilarityLeaderboardTable
          topThree={topThreeImages}
          imageRanks={imageRanks}
        />
      </div>
    </div>
  );
};

export default Page;
