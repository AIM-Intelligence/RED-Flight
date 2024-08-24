"use client";

import React from "react";

import LeaderBoardPageTable from "@/components/table/leaderboard-table/page";

const page = () => {
  return (
    <div className="custom-scrollbar mx-auto flex h-screen w-screen flex-col justify-start gap-8 overflow-y-auto">
      <div className="mx-auto mb-20 mt-[150px] w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        <LeaderBoardPageTable />
      </div>
    </div>
  );
};

export default page;
