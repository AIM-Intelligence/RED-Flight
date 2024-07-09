"use client";
import { useEffect } from "react";

import { contract, STAKING_CONTRACT } from "@/utils/contract";
import { useActiveAccount, useReadContract } from "thirdweb/react";

import { StakedNFTCard } from "@/components/staking/StakedNFTCard";
import { StakeRewards } from "@/components/staking/StakeRewards";
import { NFT } from "thirdweb";
import { getNFTs, ownerOf, totalSupply } from "thirdweb/extensions/erc721";

const Page = () => {
  const activeAccount = useActiveAccount();

  //const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);

  const getOwnedNFTs = async () => {
    let ownedNFTs: NFT[] = [];

    const totalNFTSupply = await totalSupply({
      contract: contract,
    });
    const nfts = await getNFTs({
      contract: contract,
      start: 0,
      count: parseInt(totalNFTSupply.toString()),
    });

    for (let nft of nfts) {
      const owner = await ownerOf({
        contract: contract,
        tokenId: nft.id,
      });
      if (owner === activeAccount?.address) {
        ownedNFTs.push(nft);
      }
    }
    //setOwnedNFTs(ownedNFTs);
  };

  useEffect(() => {
    if (activeAccount) {
      getOwnedNFTs();
    }
  }, [activeAccount]);

  const { data: stakedInfo, refetch: refetchStakedInfo } = useReadContract({
    contract: STAKING_CONTRACT,
    method: "getStakeInfo",
    params: [(activeAccount?.address as `0x${string}`) || ""],
  });

  return (
    <div className="max-w-7xl mx-auto z-10">
      <div className="bg-gray-800/70 shadow-2xl rounded-lg overflow-hidden md:grid md:grid-cols-2 md:gap-8 border border-red-600 p-8">
        <div style={{ width: "100%", margin: "20px 0" }}>
          <h2>Staked NFTs</h2>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px" }}>
            {stakedInfo && stakedInfo[0].length > 0 ? (
              stakedInfo[0].map((nft: any, index: number) => (
                <StakedNFTCard
                  key={index}
                  tokenId={nft}
                  refetchStakedInfo={refetchStakedInfo}
                  refetchOwnedNFTs={getOwnedNFTs}
                />
              ))
            ) : (
              <p style={{ margin: "20px" }}>No NFTs staked</p>
            )}
          </div>
        </div>
        <hr
          style={{
            width: "100%",
            border: "1px solid #333",
          }}
        />
        <StakeRewards />
      </div>
    </div>
  );
};

export default Page;
