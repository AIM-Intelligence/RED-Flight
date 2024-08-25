"use server";

import { getAuthStatus } from "../auth/auth";

import { createSupabaseServer } from "@/lib/supabase/createSupabaseAdmin";
import { Database } from "@/validation/types/supabase";

type PromptNFT = Omit<
  Database["public"]["Tables"]["prompt nft"]["Row"],
  "prompt"
>;

export async function getAllPrompts(): Promise<PromptNFT[]> {
  // Check authentication status
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error("User is not logged in");
  }

  // Create Supabase client
  const supabase = createSupabaseServer();

  // Fetch all prompt NFTs for the user
  const { data, error } = await supabase
    .from("prompt nft")
    .select(
      `
    id, created_at, creator, desc, chain_id, conversation, image_url, 
    length, level, name, nft_address, nft_id, owner, target, title, user:creator (name)
  `,
    )
    .order("length", { ascending: true });

  if (error) {
    console.error("Error fetching user prompts:", error);
    throw new Error("Failed to fetch user prompts");
  }

  return data as PromptNFT[];
}
