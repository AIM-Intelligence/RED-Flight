"use client";

import { NFT } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";

import { client } from "@/lib/client";

type NFTCollectionProps = {
  nfts: NFT[];
};

export const NFTCollection = ({ nfts }: NFTCollectionProps) => {
  return (
    <div className="m-5 flex flex-col items-center">
      <div className="flex max-w-2xl flex-row flex-wrap items-center justify-center">
        {nfts.map((nft, index) => (
          <div key={index} className="h-36 w-36 p-1">
            <MediaRenderer
              client={client}
              src={nft.metadata.image}
              className="h-full w-full rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
