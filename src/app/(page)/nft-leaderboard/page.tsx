"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { MediaRenderer } from "thirdweb/react";

import { GlareCard } from "@/components/animation/GlareCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { client } from "@/lib/client";

// Supabase 클라이언트 설정
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// NFT 타입 정의
type NFT = {
  id: number;
  image_url: string;
  title: string | null;
  desc: string | null;
  difficulty: string;
  length: number | null;
  creator: string;
};

const difficultyScores = {
  Easy: 10,
  Normal: 200,
  Hard: 500,
  Impossible: 1000,
};

const DifficultyNFTs = ({ title, nfts }: { title: string; nfts: NFT[] }) => {
  // 난이도에 해당하는 점수 가져오기
  const score = difficultyScores[title as keyof typeof difficultyScores];

  return (
    <Card className="overflow-hidden border-red-700 bg-black/70 p-2 text-red-500">
      <CardHeader className="p-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">{title}</span>
          <span className="text-sm">Score: +{score}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="custom-scrollbar h-[calc(100vh-220px)] space-y-2 overflow-y-auto p-0 py-2">
        {nfts.length > 0 ? (
          nfts.map((nft, index) => (
            <div key={nft.id} className="grid grid-cols-2 border-none">
              <div className="col-span-1">
                <GlareCard>
                  <MediaRenderer
                    client={client}
                    src={nft.image_url}
                    className="max-h-[150px] w-full object-cover"
                  />
                </GlareCard>
              </div>
              <div className="col-span-1">
                <div className="flex-between flex w-full gap-2">
                  <p className="text-5xl font-bold">#{index + 1}</p>
                </div>

                <div>
                  <div>
                    <p className="text-sm">
                      {nft.creator.slice(0, 5)}...{nft.creator.slice(-4)}
                    </p>
                    <p className="text-sm font-bold">
                      Length: {nft.length ?? "N/A"}
                    </p>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {nft.title || `NFT`}
                  </h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No NFTs in this category</p>
        )}
      </CardContent>
    </Card>
  );
};

const Page = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const { data, error } = await supabase.from("NFT_Prompt").select("*");

        if (error) throw error;

        console.log("Fetched data:", data);

        if (data) {
          setNfts(data);
        } else {
          setError("No data received from Supabase");
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setError("Failed to fetch NFTs");
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const getFilteredAndSortedNFTs = (difficulty: string) => {
    return nfts
      .filter(nft => nft.difficulty === difficulty)
      .sort((a, b) => (a.length || 0) - (b.length || 0));
  };

  return (
    <div className="z-10">
      <div className="mb-6 text-center">
        <h1 className="text-4xl">RED Flights NFT Leaderboard 🏆</h1>
        <p>Ranking of successful attacks with shorter conversations</p>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : nfts.length === 0 ? (
        <p className="text-center">No NFTs found</p>
      ) : (
        <div className="grid h-[calc(80vh-120px)] w-[calc(150vh)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DifficultyNFTs title="Easy" nfts={getFilteredAndSortedNFTs("1")} />
          <DifficultyNFTs title="Normal" nfts={getFilteredAndSortedNFTs("2")} />
          <DifficultyNFTs title="Hard" nfts={getFilteredAndSortedNFTs("3")} />
          <DifficultyNFTs
            title="Impossible"
            nfts={getFilteredAndSortedNFTs("4")}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
