"use client";
import { useEffect, useState } from "react";

import { contract } from "@/utils/contract";
import { getNFTs } from "thirdweb/extensions/erc721";
import { MediaRenderer, useActiveAccount, useReadContract } from "thirdweb/react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { client } from "@/lib/client";

import { useModal } from "@/hooks/stores/use-modal-store";

// Supabase client initialization
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// User info type definition
type UserInfo = {
  address: string;
  tutorial: boolean;
  score: number;
  tier: number;
};

const Page = () => {
  const activeAccount = useActiveAccount();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const { onOpen } = useModal();

  const { data: nfts, refetch: refetchNFTs } = useReadContract(getNFTs, {
    contract: contract,
    includeOwners: true,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (activeAccount) {
        try {
          const { data, error } = await supabase.from("User").select("*").eq("address", activeAccount.address).single();
          if (error) throw error;
          setUserInfo(data);
        } catch (error) {
          console.error("Error fetching user info:", error);
          setUserInfo(null);
        }
      }
    };
    fetchUserInfo();
  }, [activeAccount]);

  const userNFTs = nfts?.filter(nft => nft.owner === activeAccount?.address) || [];

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1:
        return "text-yellow-600";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-yellow-400";
      default:
        return "text-gray-500";
    }
  };

  const getTierName = (tier: number) => {
    switch (tier) {
      case 1:
        return "Bronze";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      default:
        return "Unranked";
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

  return (
    <div className="max-w-7xl mx-auto z-10">
      <div className="bg-gray-800 shadow-2xl rounded-lg overflow-hidden md:grid md:grid-cols-2 md:gap-8 border border-red-600">
        <div className="p-8 border-b border-red-600 md:border-b-0 md:border-r">
          <h2 className="text-3xl font-extrabold text-red-500 mb-6">User Profile</h2>
          {userInfo ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <Image
                  src="/asset/1.png"
                  width={120}
                  height={120}
                  alt="user"
                  className="rounded-full border-2 border-red-500"
                />
                <div>
                  <p className="text-xl font-semibold text-white">
                    {userInfo.address.slice(0, 6)}...{userInfo.address.slice(-4)}
                  </p>
                  <p className={`text-lg font-medium ${getTierColor(userInfo.tier)}`}>
                    {getTierName(userInfo.tier)} Tier
                  </p>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-6 space-y-4 border border-red-500">
                <div>
                  <p className="text-sm font-medium text-gray-400">Tutorial Status</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {userInfo.tutorial ? "Completed" : "Not Completed"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Score</p>
                  <p className="mt-1 text-lg font-semibold text-white">{userInfo.score}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-pulse">
              <div className="rounded-full bg-gray-700 h-32 w-32 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
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
          <div className="flex flex-row flex-wrap max-w-2xl overflow-y-auto">
            {userNFTs?.map((nft, index) => (
              <div
                key={index}
                className="p-1 w-[120px] cursor-pointer"
                onClick={() => fetchNFTPrompt(nft.metadata.image)}
              >
                <MediaRenderer client={client} src={nft.metadata.image} className=" max-h-[120px]" />
              </div>
            ))}
            {/* {userNFTs?.map((nft, index) => (
                <Dialog>
                  <DialogTrigger onClick={() => fetchNFTPrompt(nft.metadata.image)}>
                    <div key={index} className="p-1 w-36 h-36">
                      <MediaRenderer client={client} src={nft.metadata.image} className="" />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <NFTPrompt nftPromptData={selectedNFTPrompt?.prompt} />
                  </DialogContent>
                </Dialog>
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
