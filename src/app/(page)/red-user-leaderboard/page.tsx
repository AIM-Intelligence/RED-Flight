import React from 'react';

import UserLeaderBoardPageTable from '@/components/table/user-leaderboard-table/page';

const page = () => {
  return (
    <div className="custom-scrollbar mx-auto flex h-screen w-screen flex-col justify-start gap-8 overflow-y-auto">
      <div className="mx-auto mb-20 mt-[150px] w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        <UserLeaderBoardPageTable />
      </div>
    </div>
  );
};

export default page;
