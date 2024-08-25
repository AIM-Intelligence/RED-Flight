"use client";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { FirstPlace, SecondPlace, ThirdPlace } from "./components/top-three";

import {
  useTopThree,
  useUserRank,
  useUserRanks,
} from "@/hooks/userRank/useUserRank";
import { useWeb3UserStore } from "@/store/user-store";

type User = {
  id: string;
  image_url: string;
  name: string;
  wallet_address: string;
  score: number;
  easy: number;
  normal: number;
  hard: number;
  extreme: number;
  rank: number;
};

export default function UserLeaderBoardPageTable() {
  const topThreeArr = useTopThree();
  const userRankArr = useUserRanks();

  const { user } = useWeb3UserStore();
  const { status } = useUserRank();
  console.log("all user rank", userRankArr);

  if (!user) {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Red User Leaderboard
        </h2>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Loading...
        </h2>
      </div>
    );
  }

  if (status === "error") {
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
          <SecondPlace user={topThreeArr[1]} />
          <FirstPlace user={topThreeArr[0]} />
          <ThirdPlace user={topThreeArr[2]} />
        </div>

        <DataTable data={userRankArr} columns={columns} />
      </div>
    </>
  );
}
