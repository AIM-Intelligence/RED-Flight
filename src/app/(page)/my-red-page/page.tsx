"use client";

import { useMemo } from "react";

import UserInfo from "./_components/UserInfo";

import NFTTable from "@/components/table/mypage-tablew/nft-table/page";
import PromptPageTable from "@/components/table/mypage-tablew/prompt-table/page";
import { usePrompts, useSelectPrompt } from "@/hooks/prompt/useSelectPrompt";
import { useWeb3User } from "@/hooks/user/useSignIn";
import { useWeb3UserStore } from "@/store/user-store";
import { Database } from "@/validation/types/supabase";

type PromptNFT = Database["public"]["Tables"]["red prompt nft"]["Row"];
const Page = () => {
  const { user } = useWeb3UserStore();
  const prompts = usePrompts();
  const { isLoading } = useWeb3User();
  const { status } = useSelectPrompt();

  const { promptsWithChainId, promptsWithoutChainId } = useMemo(() => {
    return prompts.reduce<{
      promptsWithChainId: PromptNFT[];
      promptsWithoutChainId: PromptNFT[];
    }>(
      (acc, prompt) => {
        if (prompt.chain_id !== "0") {
          acc.promptsWithChainId.push(prompt);
        } else {
          acc.promptsWithoutChainId.push(prompt);
        }
        return acc;
      },
      { promptsWithChainId: [], promptsWithoutChainId: [] },
    );
  }, [prompts]);

  console.log("Prompts with owner:", promptsWithChainId);
  console.log("Prompts without owner:", promptsWithoutChainId);

  return (
    <div className="custom-scrollbar mx-auto flex h-screen w-screen flex-col justify-start gap-8 overflow-y-auto">
      <div className="mx-auto mt-[150px] w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        <UserInfo user={user} isLoading={isLoading} />
      </div>
      <div className="mx-auto w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60 p-8">
        <NFTTable promptsWithChainId={promptsWithChainId} status={status} />
      </div>
      <div className="mx-auto mb-20 w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        <PromptPageTable
          promptsWithoutChainId={promptsWithoutChainId}
          status={status}
        />
      </div>
    </div>
  );
};

export default Page;
