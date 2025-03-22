'use client';

import UserLeaderBoardPageTable from '@/components/table/user-leaderboard-table';
import Error from '@/app/error';
import Loading from '@/app/loading';
import {
  useTopThree,
  useUserRank,
  useUserRanks,
} from '@/hooks/userRank/useUserRank';

const Page = () => {
  const { error, isLoading } = useUserRank();
  const topThree = useTopThree();
  const userRanks = useUserRanks();

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
        <UserLeaderBoardPageTable topThree={topThree} userRanks={userRanks} />
      </div>
    </div>
  );
};

export default Page;
