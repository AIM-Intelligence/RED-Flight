"use server";

import { getAuthStatus } from "../auth/auth";

import { createSupabaseServer } from "@/lib/supabase/createSupabaseAdmin";
import { Database } from "@/validation/types/supabase";

type PromptNFT = Omit<
  Database["public"]["Tables"]["red prompt nft"]["Row"],
  "id" | "prompt"
>;

export async function getAllPrompts(): Promise<PromptNFT[]> {
  // Check authentication status
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error("User is not logged in");
  }

  // Create Supabase client
  const supabase = createSupabaseServer();

  // Fetch all red prompt nfts for the user
  const { data, error } = await supabase
    .from("red prompt nft")
    .select(
      `
    created_at, creator, desc, chain_id, conversation, image_url, 
    length, level, name, nft_address, owner, target, title, 
    transaction_hash, token_id, user:creator (name)
  `,
    )
    .order("length", { ascending: true });

  if (error) {
    console.error("Error fetching user prompts:", error);
    throw new Error("Failed to fetch Prompts");
  }

  return data as PromptNFT[];
}
