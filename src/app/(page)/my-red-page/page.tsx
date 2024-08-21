"use client";

import NFTCollection from "./_components/NFTCollection";
import UserInfo from "./_components/UserInfo";

import PromptPageTable from "@/components/table/mypage-table/page";
import { useWeb3User } from "@/hooks/user/useSignIn";
import { useWeb3UserStore } from "@/store/user-store";

const Page = () => {
  const { user } = useWeb3UserStore();
  const { isLoading } = useWeb3User();

  console.log("user", user);

  return (
    <div className="custom-scrollbar mx-auto flex h-screen w-screen flex-col justify-start gap-8 overflow-y-auto">
      <div className="mx-auto mt-[150px] w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        <UserInfo user={user} isLoading={isLoading} />
      </div>
      <div className="mx-auto w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60 p-8">
        <NFTCollection />
      </div>
      <div className="mx-auto mb-20 w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        <PromptPageTable />
      </div>
    </div>
  );
};

export default Page;
