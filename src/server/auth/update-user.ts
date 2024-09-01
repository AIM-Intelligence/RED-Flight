"use server";

import { getAuthStatus } from "./auth";

import { createSupabaseServer } from "@/lib/supabase/createSupabaseAdmin";
import { Database } from "@/validation/types/supabase";

type User = Database["public"]["Tables"]["user"]["Row"];

type UpdateUserProfileParams = {
  name: string | null;
  description: string | null;
  email: string | null;
  imageUrl: string | null;
};

export async function updateUserProfile(
  params: UpdateUserProfileParams,
): Promise<User> {
  const { name, description, email, imageUrl } = params;

  // Check authentication status
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error("User is not logged in");
  }

  const walletAddress = authStatus.walletAddress?.parsedJWT.sub;

  if (!walletAddress) {
    throw new Error("Wallet address not found");
  }

  // Create Supabase client
  const supabase = createSupabaseServer();

  const { data, error } = await supabase
    .from("user")
    .update({
      name,
      description,
      email,
      image_url: imageUrl,
    })
    .eq("wallet_address", walletAddress)
    .select()
    .single();

  console.log("user update error", error);

  if (error && error.code === "23505") {
    throw new Error("This name already exists");
  } else if (error) {
    throw new Error("Failed to update user profile");
  }

  return data as User;
}
