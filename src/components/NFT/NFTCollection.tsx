"use client";

import { client } from "@/lib/client";
import { NFT } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";

type NFTCollectionProps = {
  nfts: NFT[];
};

export const NFTCollection = ({ nfts }: NFTCollectionProps) => {
  return (
    <div className="flex flex-col items-center m-5">
      <div className="flex flex-row flex-wrap items-center justify-center max-w-2xl">
        {nfts.map((nft, index) => (
          <div key={index} className="p-1 w-36 h-36">
            <MediaRenderer client={client} src={nft.metadata.image} className="w-full h-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};
