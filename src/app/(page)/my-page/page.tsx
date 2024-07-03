"use client";
import { useEffect, useState, useTransition } from "react";

import { contract } from "@/utils/contract";
import { getNFTs } from "thirdweb/extensions/erc721";
import { MediaRenderer, useActiveAccount, useReadContract } from "thirdweb/react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { client } from "@/lib/client";

import { useModal } from "@/store/use-modal-store";
import { GlareCard } from "@/components/animation/glare-card";
import { Button } from "@/components/ui/button";

// Supabase client initialization
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

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

  const userNFTs = nfts?.filter(nft => nft.owner === activeAccount?.address) || [];

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
            setUserInfo({ ...data, nftCount: userNFTs.length, generatedImage: "" });
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
      return "Bronze";
    } else if (score > 2000) {
      return "Silver";
    } else if (score > 5000) {
      return "Gold";
    }
  };

  const fetchNFTPrompt = async (imageUri: any) => {
    try {
      const { data, error } = await supabase.from("NFT_Prompt").select("*").eq("image_url", imageUri).single();

      if (error) throw error;

      const nftDetail = data?.prompt;

      console.log(nftDetail);
      onOpen("showPromptData", { nftDetail });
    } catch (error) {
      console.error("Error fetching NFT prompt:", error);
    }
  };

  const reversedUserNFTs = [...userNFTs].reverse();

  return (
    <div className="max-w-7xl mx-auto z-10">
      <div className="bg-gray-800/70 shadow-2xl rounded-lg overflow-hidden md:grid md:grid-cols-2 md:gap-8 border border-red-600">
        <div className="p-8 border-b border-red-600 md:border-b-0 md:border-r">
          <div className="w-full flex justify-between">
            <h2 className="text-3xl font-extrabold text-red-500 mb-6">User Profile</h2>

            <Button onClick={() => onOpen("showUserInfoEdit", { userInfo })}>Edit</Button>
          </div>
          {isPending ? (
            <div className="animate-pulse">
              <div className="rounded-full bg-gray-700 h-32 w-32 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
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
                  className="rounded-full border-2 border-red-500 max-w-[140px] max-h-[140px]"
                />
                <div>
                  <p className="text-xl font-semibold text-white">{userInfo.name}</p>
                  <p>{userInfo.email}</p>
                  {/* <p className={`text-lg font-medium ${getTierColor(userInfo.tier)}`}>{getTierName(userInfo.score)}</p> */}
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-6 space-y-4 border border-red-500">
                <div>
                  <p className="text-sm font-medium text-gray-400">Wallet Address</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {/* {userInfo.address.slice(0, 5)}...{userInfo.address.slice(-4)} */}
                    {userInfo.address}
                  </p>

                  <p className="text-sm font-medium text-gray-400">Description</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {userInfo.description ? userInfo.description : "empty"}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-transparent via-red-500 to-transparent my-6 h-[2px] w-full" />

                <div className="grid grid-cols-3">
                  <div className="col-span-1">
                    <p className="text-sm font-medium text-gray-400">Score</p>
                    <p className="mt-1 text-lg font-semibold text-white">{userInfo.score}</p>
                    <p className="text-sm font-medium text-gray-400">Demo Status</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {userInfo.tutorial ? "Completed" : "Not Completed"}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-transparent via-red-500 to-transparent my-6 h-[2px] w-full rotate-90" />

                  <div className="col-span-1">
                    <Image src={`/rank/${getTierName(userInfo.score)}.png`} width={150} height={150} alt="rank" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-3xl">We can&apos;t verify your user information, please play the demo.</p>
          )}
        </div>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6 gap-4">
            <h2 className="text-3xl font-extrabold text-red-500">NFT Collection</h2>
            <button
              onClick={() => refetchNFTs()}
              className="px-4 py-2 border border-red-500 text-sm font-medium rounded-md text-red-500 bg-transparent hover:bg-red-500 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Refresh NFTs
            </button>
          </div>
          <div className="flex flex-wrap max-w-2xl overflow-y-auto items-center">
            {isLoading ? (
              <div className="animate-pulse flex flex-wrap gap-2">
                <div className="h-28 w-28 bg-gray-700 rounded "></div>
                <div className="h-28 w-28 bg-gray-700 rounded "></div>
                <div className="h-28 w-28 bg-gray-700 rounded "></div>
                <div className="h-28 w-28 bg-gray-700 rounded "></div>
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto custom-scrollbar flex flex-row flex-wrap items-center gap-4 ">
                {reversedUserNFTs &&
                  reversedUserNFTs?.map((nft, index) => (
                    <div key={index} onClick={() => fetchNFTPrompt(nft.metadata.image)} className="cursor-pointer">
                      <GlareCard>
                        <div key={index} className="w-[150px]">
                          <MediaRenderer client={client} src={nft.metadata.image} className=" max-h-[150px] " />
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
