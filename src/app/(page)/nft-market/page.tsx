"use client";

import { client } from "@/lib/client";
import { contract } from "@/utils/contract";
import { getNFTs } from "thirdweb/extensions/erc721";
import { MediaRenderer, useReadContract } from "thirdweb/react";

const page = () => {
  const { data: nfts } = useReadContract(getNFTs, {
    contract: contract,
    includeOwners: true,
  });

  console.log(nfts);

  return (
    <div className="z-10">
      <div>
        <h1 className="text-4xl">RED Flights</h1>
        <p>NFT Prompt Data Market Coming Soon....</p>
      </div>
      <div className="flex flex-col items-center m-5">
        <div className="flex flex-row flex-wrap items-center justify-center max-w-6xl">
          {nfts ? (
            nfts.map((nft, index) => (
              <div key={index} className="p-1 w-[120px]">
                <MediaRenderer client={client} src={nft.metadata.image} className=" max-h-[120px]" />
              </div>
            ))
          ) : (
            <p>loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
