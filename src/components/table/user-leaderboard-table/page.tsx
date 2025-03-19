'use client';

import { Database } from '@/validation/types/supabase';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { TopThreePlace } from './components/top-three';

type User = Database['public']['Tables']['user']['Row'];

interface UserLeaderBoardPageTableProps {
  userData?: User[];
}

export default function UserLeaderBoardPageTable({
  userData = [],
}: UserLeaderBoardPageTableProps) {
  if (!userData || userData.length === 0) {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          No data available
        </h2>
      </div>
    );
  }

  // Extract top three users and remaining users (safely)
  const topThreeArr = userData.slice(0, Math.min(3, userData.length));
  const userRankArr = userData.length > 3 ? userData.slice(3) : [];

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-red-600">
          RED User Leaderboard
        </h2>
      </div>
      <div className="flex justify-center gap-4">
        {/* Only render if we have enough users */}
        {topThreeArr.length > 1 && (
          <TopThreePlace user={topThreeArr[1]} place={2} />
        )}
        {topThreeArr.length > 0 && (
          <TopThreePlace user={topThreeArr[0]} place={1} />
        )}
        {topThreeArr.length > 2 && (
          <TopThreePlace user={topThreeArr[2]} place={3} />
        )}
      </div>

      <DataTable data={userRankArr} columns={columns} />
    </div>
  );
}
