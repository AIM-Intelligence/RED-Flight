"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/client";
import { MediaRenderer } from "thirdweb/react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { GlareCard } from "@/components/animation/GlareCard";

// Supabase 클라이언트 설정
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

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
    <Card className="overflow-hidden bg-black/70 text-red-500 border-red-700 p-2">
      <CardHeader className="p-2">
        <CardTitle className=" flex justify-between items-center ">
          <span className="text-lg">{title}</span>
          <span className="text-sm">Score: +{score}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100vh-220px)] overflow-y-auto custom-scrollbar p-0 space-y-2 py-2">
        {nfts.length > 0 ? (
          nfts.map((nft, index) => (
            <div key={nft.id} className="border-none grid grid-cols-2">
              <div className="col-span-1">
                <GlareCard>
                  <MediaRenderer client={client} src={nft.image_url} className="w-full max-h-[150px] object-cover" />
                </GlareCard>
              </div>
              <div className="col-span-1">
                <div className="w-full flex flex-between gap-2">
                  <p className="text-5xl font-bold">#{index + 1}</p>
                </div>

                <div>
                  <div>
                    <p className="text-sm">
                      {nft.creator.slice(0, 5)}...{nft.creator.slice(-4)}
                    </p>
                    <p className="text-sm font-bold">Length: {nft.length ?? "N/A"}</p>
                  </div>
                  <h3 className="text-lg font-bold text-white">{nft.title || `NFT`}</h3>
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
    return nfts.filter(nft => nft.difficulty === difficulty).sort((a, b) => (a.length || 0) - (b.length || 0));
  };

  return (
    <div className="z-10">
      <div className="text-center mb-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(80vh-120px)] w-[calc(150vh)]">
          <DifficultyNFTs title="Easy" nfts={getFilteredAndSortedNFTs("1")} />
          <DifficultyNFTs title="Normal" nfts={getFilteredAndSortedNFTs("2")} />
          <DifficultyNFTs title="Hard" nfts={getFilteredAndSortedNFTs("3")} />
          <DifficultyNFTs title="Impossible" nfts={getFilteredAndSortedNFTs("4")} />
        </div>
      )}
    </div>
  );
};

export default Page;
