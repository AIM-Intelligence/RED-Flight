"use server";

import { getAuthStatus } from "../auth/auth";

import { createSupabaseServer } from "@/lib/supabase/createSupabaseAdmin";
import { Database } from "@/validation/types/supabase";

type PromptNFT = Database["public"]["Tables"]["prompt nft"]["Row"];

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

  // Fetch all prompt NFTs for the user
  const { data, error } = await supabase
    .from("prompt nft")
    .select("*")
    .eq("creator", walletAddress);

  if (error) {
    console.error("Error fetching user prompts:", error);
    throw new Error("Failed to fetch user prompts");
  }

  return data as PromptNFT[];
}
