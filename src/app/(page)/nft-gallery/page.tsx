"use client";

import { getNFTs } from "thirdweb/extensions/erc721";
import {
  MediaRenderer,
  useActiveWalletChain,
  useReadContract,
} from "thirdweb/react";

import { GlareCardGallery } from "@/components/animation/GlareCardGallery";
import { client } from "@/lib/client";
import { getAllContracts } from "@/utils/contract";

const page = () => {
  const chain = useActiveWalletChain();

  const chainId = chain ? chain.id : 1115;
  const { contract } = getAllContracts(chainId);

  const { data: nfts } = useReadContract(getNFTs, {
    contract: contract,
    includeOwners: true,
  });

  console.log(nfts);

  return (
    <div className="z-10">
      <div>
        <h1 className="text-4xl">RED Flight NFTs Gallery</h1>
        <p>NFT Prompt Data Market Coming Soon....</p>
      </div>
      <div className="m-5 flex flex-col items-center">
        <div className="flex max-w-6xl flex-row flex-wrap items-center justify-center gap-2">
          {nfts ? (
            nfts.map((nft, index) => (
              <GlareCardGallery key={index}>
                <div className="w-[120px]">
                  <MediaRenderer
                    client={client}
                    src={nft.metadata.image}
                    className="max-h-[120px]"
                  />
                </div>
              </GlareCardGallery>
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
