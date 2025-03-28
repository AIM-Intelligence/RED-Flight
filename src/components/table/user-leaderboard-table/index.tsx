'use client';

import { useMediaQuery } from 'react-responsive';

import { Database } from '@/validation/types/supabase';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { TopThreePlace } from './components/top-three';

type User = Database['public']['Tables']['user']['Row'];

interface UserLeaderBoardPageTableProps {
  topThree: User[];
  userRanks: User[];
}

export default function SimilarityLeaderBoardPageTable({
  topThree = [],
  userRanks = [],
}: UserLeaderBoardPageTableProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Determine what data to show in the table based on device
  const tableData = isMobile ? [...topThree, ...userRanks] : userRanks;

  if (topThree.length === 0 && userRanks.length === 0) {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          No data available
        </h2>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-red-600">
          RED User Leaderboard
        </h2>
      </div>

      {/* Only show TopThreePlace on non-mobile devices */}
      {!isMobile && (
        <div className="flex justify-center gap-4">
          {topThree.length > 1 && (
            <TopThreePlace user={topThree[1]} place={2} />
          )}
          {topThree.length > 0 && (
            <TopThreePlace user={topThree[0]} place={1} />
          )}
          {topThree.length > 2 && (
            <TopThreePlace user={topThree[2]} place={3} />
          )}
        </div>
      )}

      <DataTable data={tableData} columns={columns} />
    </div>
  );
}
