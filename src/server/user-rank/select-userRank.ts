"use server";

import { getAuthStatus } from "../auth/auth";

import { createSupabaseServer } from "@/lib/supabase/createSupabaseAdmin";
import { Database } from "@/validation/types/supabase";

type User = Database["public"]["Tables"]["user"]["Row"];

export async function getUserRank(): Promise<User[]> {
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error("User is not logged in");
  }

  const supabase = createSupabaseServer();

  const { data, error } = await supabase
    .from("user")
    .select("*")
    .order("score", { ascending: false });

  if (error) {
    console.error("Error fetching user prompts:", error);
    throw new Error("Failed to fetch user prompts");
  }

  return data as User[];
}
