import { NextRequest, NextResponse } from "next/server";

import { profileNftCollectionContractAddress } from "@/utils/contractZeta";

const { ENGINE_URL, ACCESS_TOKEN, BACKEND_WALLET_ADDRESS, CHAIN_ID } =
  process.env;

export async function POST(req: NextRequest) {
  console.log("Minting NFT");
  if (!ENGINE_URL || !ACCESS_TOKEN || !BACKEND_WALLET_ADDRESS || !CHAIN_ID) {
    return new NextResponse(
      JSON.stringify({ error: "Missing required environment variables" }),
      { status: 500 },
    );
  }

  const { nftImage, address, traits } = await req.json();

  console.log("traits", traits);

  try {
    const mintResponse = await fetch(
      `${ENGINE_URL}/contract/${CHAIN_ID}/${profileNftCollectionContractAddress}/erc721/mint-to`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "x-backend-wallet-address": BACKEND_WALLET_ADDRESS,
        },
        body: JSON.stringify({
          receiver: address,
          metadata: {
            name: traits.title,
            description: traits.desc,
            image: nftImage,
            attributes: [
              {
                trait_type: "name",
                value: traits.name,
              },
              {
                trait_type: "Score",
                value: traits.score,
              },
              {
                trait_type: "Team",
                value: traits.team,
              },
              {
                trait_type: "NFT_count",
                value: traits.nft_count,
              },
            ],
          },
        }),
      },
    );

    if (!mintResponse.ok) {
      const error = await mintResponse.text();
      throw new Error(`Failed to mint NFT: ${error}`);
    }

    return new NextResponse(
      JSON.stringify({ message: "NFT minted successfully" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Minting error:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to mint NFT" }), {
      status: 500,
    });
  }
}
