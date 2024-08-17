"use server";

// Adjust the import path as needed
import { getAuthStatus } from "./auth";

import { createSupabaseServer } from "@/lib/supabase/createSupabaseAdmin";
import { Database } from "@/validation/types/supabase";

type Web3User = Database["public"]["Tables"]["user"]["Row"];

// Adjust the import path as needed

export async function getOrCreateWeb3User(): Promise<Web3User> {
  // Check authentication status
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error("User is not logged in");
  }

  const walletAddress = authStatus.walletAddress?.parsedJWT.sub;

  if (!walletAddress) {
    throw new Error("Wallet address not found");
  }

  console.log("walletAddress", walletAddress);

  // Create Supabase client
  const supabase = createSupabaseServer();

  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("wallet_address", walletAddress)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error("Failed to fetch user data");
  }

  if (data) {
    return data as Web3User;
  }

  // If user doesn't exist, create a new one
  const { data: newUser, error: insertError } = await supabase
    .from("user")
    .insert({
      wallet_address: walletAddress,
    })
    .select()
    .single();

  if (insertError) {
    throw new Error("Failed to create new user");
  }

  return newUser as Web3User;
}
