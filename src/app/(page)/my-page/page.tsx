"use client";

import { useEffect, useState, useTransition } from "react";

import Image from "next/image";

import { createClient } from "@supabase/supabase-js";
import { getNFTs } from "thirdweb/extensions/erc721";
import {
  MediaRenderer,
  useActiveAccount,
  useActiveWalletChain,
  useReadContract,
} from "thirdweb/react";

import { GlareCard } from "@/components/animation/GlareCard";
import { Button } from "@/components/ui/Button";
import { client } from "@/lib/client";
import { useModal } from "@/store/use-modal-store";
import { getAllContracts } from "@/utils/contract";

// Supabase client initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// User info type definition
type UserInfo = {
  address: string;
  tutorial: boolean;
  score: number;
  tier: number;
  description: string;
  name: string;
  teams: string;
  image_url: string;
  email: string;
  nftCount: number;
};

const Page = () => {
  const activeAccount = useActiveAccount();

  const chain = useActiveWalletChain();

  //! Build할 때 mount error 발생 => middleware로 해결하자
  // useEffect(() => {
  //   if (!chain) {
  //     router.push("/login");
  //   }
  // }, [chain]);
  const chainId = chain ? chain.id : 1115;

  const { contract, STAKING_CONTRACT } = getAllContracts(chainId);

  console.log("contract", contract);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isPending, startTransition] = useTransition();

  const { onOpen } = useModal();

  const {
    data: nfts,
    refetch: refetchNFTs,
    isLoading,
  } = useReadContract(getNFTs, {
    contract: contract,
    includeOwners: true,
  });

  const userNFTs =
    nfts?.filter(nft => nft.owner === activeAccount?.address) || [];

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (activeAccount) {
        startTransition(async () => {
          try {
            const { data, error } = await supabase
              .from("User")
              .select("*")
              .eq("address", activeAccount.address)
              .single();
            if (error) throw error;
            setUserInfo({
              ...data,
              nftCount: userNFTs.length,
              generatedImage: "",
            });
          } catch (error) {
            console.error("Error fetching user info:", error);
            setUserInfo(null);
          }
        });
      }
    };
    fetchUserInfo();
  }, [activeAccount, userNFTs.length]);

  // const getTierColor = (tier: number) => {
  //   switch (tier) {
  //     case 1:
  //       return "text-yellow-600";
  //     case 2:
  //       return "text-gray-400";
  //     case 3:
  //       return "text-yellow-400";
  //     default:
  //       return "text-gray-500";
  //   }
  // };

  const getTierName = (score: number) => {
    if (score > 0) {
      return "bronze";
    } else if (score > 3000) {
      return "silver";
    } else if (score > 10000) {
      return "gold";
    }
  };

  const { data: stakedInfo, refetch: refetchStakedInfo } = useReadContract({
    contract: STAKING_CONTRACT,
    method: "getStakeInfo",
    params: [(activeAccount?.address as `0x${string}`) || ""],
  });

  console.log("stakedInfo", stakedInfo);
  const fetchNFTPrompt = async (imageUri: any, id: any) => {
    try {
      const { data, error } = await supabase
        .from("NFT_Prompt")
        .select("*")
        .eq("image_url", imageUri)
        .single();

      if (error) throw error;

      const nftDetail = data?.prompt;
      await new Promise(resolve => setTimeout(resolve, 50));

      // console.log(nftDetail);
      onOpen("showPromptData", {
        nftDetail,
        id,
        stakedInfo,
        refetchStakedInfo,
      });
    } catch (error) {
      console.error("Error fetching NFT prompt:", error);
    }
  };

  const reversedUserNFTs = [...userNFTs].reverse();

  return (
    <div className="z-10 mx-auto max-w-7xl">
      <div className="overflow-hidden rounded-lg border border-red-600 bg-gray-800/70 shadow-2xl md:grid md:grid-cols-2 md:gap-8">
        <div className="border-b border-red-600 p-8 md:border-b-0 md:border-r">
          <div className="flex w-full justify-between">
            <h2 className="mb-6 text-3xl font-extrabold text-red-500">
              User Profile
            </h2>

            <Button onClick={() => onOpen("showUserInfoEdit", { userInfo })}>
              Edit
            </Button>
          </div>
          {isPending ? (
            <div className="animate-pulse">
              <div className="mb-4 h-32 w-32 rounded-full bg-gray-700"></div>
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-700"></div>
              <div className="h-4 w-1/2 rounded bg-gray-700"></div>
            </div>
          ) : userInfo ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                {/* <Image
                  src="/asset/1.png"
                  width={120}
                  height={120}
                  alt="user"
                  className="rounded-full border-2 border-red-500"
                /> */}
                <MediaRenderer
                  client={client}
                  src={userInfo.image_url}
                  className="max-h-[140px] max-w-[140px] rounded-full border-2 border-red-500"
                />
                <div>
                  <p className="text-xl font-semibold text-white">
                    {userInfo.name}
                  </p>
                  <p>{userInfo.email}</p>
                  {/* <p className={`text-lg font-medium ${getTierColor(userInfo.tier)}`}>{getTierName(userInfo.score)}</p> */}
                </div>
              </div>
              <div className="space-y-4 rounded-lg border border-red-500 bg-gray-700 p-6">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Wallet Address
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {/* {userInfo.address.slice(0, 5)}...{userInfo.address.slice(-4)} */}
                    {userInfo.address}
                  </p>

                  <p className="text-sm font-medium text-gray-400">
                    Description
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {userInfo.description ? userInfo.description : "empty"}
                  </p>
                </div>
                <div className="my-6 h-[2px] w-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />

                <div className="grid grid-cols-3">
                  <div className="col-span-1">
                    <p className="text-sm font-medium text-gray-400">Score</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {userInfo.score}
                    </p>
                    <p className="text-sm font-medium text-gray-400">
                      Demo Status
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {userInfo.tutorial ? "Completed" : "Not Completed"}
                    </p>
                  </div>

                  <div className="my-6 h-[2px] w-full rotate-90 bg-gradient-to-r from-transparent via-red-500 to-transparent" />

                  <div className="col-span-1">
                    <Image
                      src={`/rank/${getTierName(userInfo.score)}.png`}
                      width={150}
                      height={150}
                      alt="rank"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-3xl">
              We can&apos;t verify your user information, please play the demo.
            </p>
          )}
        </div>
        <div className="p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-3xl font-extrabold text-red-500">
              NFT Collection
            </h2>
            <button
              onClick={() => refetchNFTs()}
              className="rounded-md border border-red-500 bg-transparent px-4 py-2 text-sm font-medium text-red-500 transition-colors duration-300 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Refresh NFTs
            </button>
          </div>
          <div className="flex max-w-2xl flex-wrap items-center overflow-y-auto">
            {isLoading ? (
              <div className="flex animate-pulse flex-wrap gap-2">
                <div className="h-28 w-28 rounded bg-gray-700"></div>
                <div className="h-28 w-28 rounded bg-gray-700"></div>
                <div className="h-28 w-28 rounded bg-gray-700"></div>
                <div className="h-28 w-28 rounded bg-gray-700"></div>
              </div>
            ) : (
              <div className="custom-scrollbar flex max-h-[500px] flex-row flex-wrap items-center gap-4 overflow-y-auto">
                {reversedUserNFTs &&
                  reversedUserNFTs?.map((nft, index) => (
                    <div
                      key={index}
                      onClick={() => fetchNFTPrompt(nft.metadata.image, nft.id)}
                      className="cursor-pointer"
                    >
                      <GlareCard>
                        <div key={index} className="w-[150px]">
                          <MediaRenderer
                            client={client}
                            src={nft.metadata.image}
                            className="max-h-[150px]"
                          />
                        </div>
                      </GlareCard>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
