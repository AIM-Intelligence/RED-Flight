'use client';

import { useMediaQuery } from 'react-responsive';

import { ImageRankWithUser } from '@/server/rank/select-imageRank';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { TopThreePlace } from './components/top-three';

interface SimilarityLeaderboardTableProps {
  topThree: ImageRankWithUser[];
  imageRanks: ImageRankWithUser[];
}

export default function SimilarityLeaderboardTable({
  topThree = [],
  imageRanks = [],
}: SimilarityLeaderboardTableProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Determine what data to show in the table based on device
  const tableData = isMobile ? [...topThree, ...imageRanks] : imageRanks;

  if (topThree.length === 0 && imageRanks.length === 0) {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          No data available
        </h2>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-red-600">
          TOP 50 Image Similarity Leaderboard
        </h2>
      </div>

      {/* Only show TopThreePlace on non-mobile devices */}
      {!isMobile && (
        <div className="flex justify-center gap-4">
          {topThree.length > 1 && (
            <TopThreePlace image={topThree[1]} place={2} />
          )}
          {topThree.length > 0 && (
            <TopThreePlace image={topThree[0]} place={1} />
          )}
          {topThree.length > 2 && (
            <TopThreePlace image={topThree[2]} place={3} />
          )}
        </div>
      )}

      <DataTable data={tableData} columns={columns} />
    </div>
  );
}
