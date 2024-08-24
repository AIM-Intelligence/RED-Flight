"use server";

import { getAuthStatus } from "../auth/auth";

import { createSupabaseServer } from "@/lib/supabase/createSupabaseAdmin";

// import { Database } from "@/validation/types/supabase";

type User = {
  id: string;
  image_url: string;
  name: string;
  wallet_address: string;
  score: number;
  easy: number;
  normal: number;
  hard: number;
  extreme: number;
  rank: number;
};
// type User = Database["public"]["Tables"]["user"]["Row"];

export async function getUserRank(): Promise<User[]> {
  // Check authentication status
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error("User is not logged in");
  }

  // Create Supabase client
  const supabase = createSupabaseServer();

  // Fetch all prompt NFTs for the user
  const { data, error } = await supabase
    .from("user")
    .select(
      "id, image_url, name, wallet_address, score, easy, normal, hard, extreme",
    )
    .order("score", { ascending: false });

  console.log(data);

  const rankedData = data?.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  console.log(rankedData);

  if (error) {
    console.error("Error fetching user prompts:", error);
    throw new Error("Failed to fetch user prompts");
  }

  return rankedData as User[];
}
