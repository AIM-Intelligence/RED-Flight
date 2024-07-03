import { NextRequest, NextResponse } from "next/server";
import { nftCollectionContractAddress } from "@/utils/contract";

const { ENGINE_URL, ACCESS_TOKEN, BACKEND_WALLET_ADDRESS, CHAIN_ID } = process.env;

export async function POST(req: NextRequest) {
  console.log("Minting NFT");
  if (!ENGINE_URL || !ACCESS_TOKEN || !BACKEND_WALLET_ADDRESS || !CHAIN_ID) {
    return new NextResponse(JSON.stringify({ error: "Missing required environment variables" }), { status: 500 });
  }

  const { nftImage, address, traits } = await req.json();

  console.log("traits", traits);

  try {
    const mintResponse = await fetch(
      `${ENGINE_URL}/contract/${CHAIN_ID}/${nftCollectionContractAddress}/erc721/mint-to`,
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
                trait_type: "Difficulty",
                value: traits.difficulty,
              },
              {
                trait_type: "Conversation",
                value: traits.converation,
              },
              {
                trait_type: "Story",
                value: traits.story,
              },
              {
                trait_type: "Length",
                value: traits.length,
              },
              {
                trait_type: "Target",
                value: traits.target,
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

    return new NextResponse(JSON.stringify({ message: "NFT minted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Minting error:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to mint NFT" }), { status: 500 });
  }
}
