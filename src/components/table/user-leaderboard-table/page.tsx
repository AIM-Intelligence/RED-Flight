'use client';

import {
  useTopThree,
  useUserRank,
  useUserRanks,
} from '@/hooks/userRank/useUserRank';
import { useWeb3UserStore } from '@/store/user-store';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { TopThreePlace } from './components/top-three';

export default function UserLeaderBoardPageTable() {
  const topThreeArr = useTopThree();
  const userRankArr = useUserRanks();

  const { user } = useWeb3UserStore();
  const { status } = useUserRank();

  if (!user) {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Red User Leaderboard
        </h2>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Loading...
        </h2>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Error
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-red-600">
            RED User Leaderboard
          </h2>
        </div>
        <div className="flex justify-center gap-4">
          <TopThreePlace user={topThreeArr[1]} place={2} />
          <TopThreePlace user={topThreeArr[0]} place={1} />
          <TopThreePlace user={topThreeArr[2]} place={3} />
        </div>

        <DataTable data={userRankArr} columns={columns} />
      </div>
    </>
  );
}
