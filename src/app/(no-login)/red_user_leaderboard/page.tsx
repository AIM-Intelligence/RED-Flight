'use client';

import { useQuery } from '@tanstack/react-query';

import UserLeaderBoardPageTable from '@/components/table/user-leaderboard-table/page';
import Error from '@/app/error';
import Loading from '@/app/loading';
import { getUserRank } from '@/server/user-rank/select-userRank'; // Make sure this import exists

const Page = () => {
  // Use the prefetched data from the server
  const {
    data: userRankData = [], // Provide default empty array
    error,
    isLoading,
  } = useQuery({
    queryKey: ['userRanks'],
    queryFn: getUserRank,
  });

  if (isLoading) return <Loading />;
  if (error) {
    return (
      <Error
        message={
          error instanceof Error
            ? error.message
            : 'Error loading leaderboard data'
        }
      />
    );
  }

  return (
    <div className="custom-scrollbar mx-auto flex h-screen w-screen flex-col justify-start gap-8 overflow-y-auto py-20">
      <div className="mx-auto w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        <UserLeaderBoardPageTable userData={userRankData} />
      </div>
    </div>
  );
};

export default Page;
