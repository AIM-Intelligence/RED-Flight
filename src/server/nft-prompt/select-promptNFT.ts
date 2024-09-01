"use server";

import { getAuthStatus } from "../auth/auth";

import { createSupabaseServer } from "@/lib/supabase/createSupabaseAdmin";
import { Database } from "@/validation/types/supabase";

type PromptNFT = Database["public"]["Tables"]["red prompt nft"]["Row"];

// user의 모든 prompt 반환
export async function getUserPrompts(): Promise<PromptNFT[]> {
  // Check authentication status
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error("User is not logged in");
  }

  const walletAddress = authStatus.walletAddress?.parsedJWT.sub;

  console.log("walletAddress", walletAddress);
  if (!walletAddress) {
    throw new Error("Wallet address not found");
  }

  // Create Supabase client
  const supabase = createSupabaseServer();

  // Fetch all red prompt nfts for the user
  const { data, error } = await supabase
    .from("red prompt nft")
    .select("*")
    .eq("creator", walletAddress);

  if (error) {
    console.error("Error fetching user prompts:", error);
    throw new Error("Failed to fetch user prompts");
  }

  return data as PromptNFT[];
}

// user가 소유하고 있는 nft 반환
export async function getUserNFTs(): Promise<PromptNFT[]> {
  // Check authentication status
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error("User is not logged in");
  }

  const walletAddress = authStatus.walletAddress?.parsedJWT.sub;

  console.log("walletAddress", walletAddress);
  if (!walletAddress) {
    throw new Error("Wallet address not found");
  }

  // Create Supabase client
  const supabase = createSupabaseServer();

  // Fetch all red prompt nfts for the user
  const { data, error } = await supabase
    .from("red prompt nft")
    .select("*")
    .eq("owner", walletAddress);

  if (error) {
    console.error("Error fetching user prompts:", error);
    throw new Error("Failed to fetch user prompts");
  }

  return data as PromptNFT[];
}
