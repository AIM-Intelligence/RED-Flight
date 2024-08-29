"use server";

import { readContract } from "thirdweb";

import { createSupabaseServer } from "@/lib/supabase/createSupabaseAdmin";
import { getAuthStatus } from "@/server/auth/auth";
import { getAllContracts } from "@/utils/contract";
import { getExplorerApiUrl } from "@/utils/explore";

type NFTClaim = {
  transactionHash: string;
  chainId: number;
  promptId: string;
  title: string;
  description: string;
};

type UpdatePromptNFT = {
  success: boolean;
};

export async function updateREDPrompt(
  params: NFTClaim,
): Promise<UpdatePromptNFT> {
  const { transactionHash, chainId, promptId, title, description } = params;
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error("User is not logged in");
  }

  const walletAddress = authStatus.walletAddress?.parsedJWT.sub;

  if (!walletAddress) {
    throw new Error("Wallet address not found");
  }

  const baseUrl = getExplorerApiUrl(chainId);
  const supabase = createSupabaseServer();

  console.log("transactionHash", transactionHash);

  try {
    const response = await fetch(`${baseUrl}${transactionHash}`);
    const data = await response.json();

    console.log("data", data);

    if (!data.token_transfers || data.token_transfers.length === 0) {
      throw new Error("No token transfers found in the transaction");
    }

    console.log(data.token_transfers);

    const tokenIds = data.token_transfers.map((transfer: any) =>
      BigInt(transfer.total.token_id),
    );

    console.log("transactionHash", transactionHash);
    console.log("chainId", chainId);
    console.log("promptId", promptId);
    console.log("title", title);
    console.log("description", description);
    console.log("data.token_transfers", data.token_transfers);
    console.log("tokenIds", tokenIds);

    //! Onchain

    const { NFT_DROP_CONTRACT } = getAllContracts(chainId)!;

    const contract = NFT_DROP_CONTRACT;

    const validTokenIds: number[] = [];
    const tokenURIs: string[] = [];

    for (const tokenId of tokenIds) {
      console.log("tokenId", tokenId);
      console.log("tokenId", BigInt(tokenId));
      try {
        const owner = await readContract({
          contract,
          method: "function ownerOf(uint256 tokenId) view returns (address)",
          params: [BigInt(tokenId)],
        });

        if (owner.toLowerCase() === walletAddress.toLowerCase()) {
          validTokenIds.push(tokenId.toString());
          const _tokenId = tokenId;

          const uri = await readContract({
            contract,
            method: "function tokenURI(uint256 _tokenId) view returns (string)",
            params: [_tokenId],
          });

          tokenURIs.push(uri);
        }
      } catch (error) {
        console.error(`Error processing token ID ${tokenId}:`, error);
      }
    }

    if (validTokenIds.length === 0) {
      throw new Error("No valid NFTs found for the user");
    }

    console.log("validTokenIds", validTokenIds);
    console.log("tokenURIs", tokenURIs);

    const { error: updateError } = await supabase
      .from("red prompt nft")
      .update({
        transaction_hash: transactionHash,
        token_id: validTokenIds,
        image_url: tokenURIs,
        chain_id: chainId,
        nft_address: NFT_DROP_CONTRACT.address,
        title: title,
        desc: description,
      })
      .eq("id", promptId);

    if (updateError) {
      throw new Error(`Failed to update prompt: ${updateError.message}`);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      success: false,
    };
  }
}
