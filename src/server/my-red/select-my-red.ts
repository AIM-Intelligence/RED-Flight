'use server';

import { createSupabaseServer } from '@/lib/supabase/createSupabaseAdmin';
import { Database } from '@/validation/types/supabase';
import { getAuthStatus } from '../auth/auth';

type FirstRed = Database['public']['Tables']['first-red']['Row'];

// Cache for Supabase client to avoid recreating it on every call
let supabaseClient: ReturnType<typeof createSupabaseServer> | null = null;

// Optimized function to get user's first-red prompts
export async function getUserFirstRedPrompts(): Promise<FirstRed[]> {
  // Check authentication status - this is necessary
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error('User is not logged in');
  }

  const walletAddress = authStatus.walletAddress?.parsedJWT.sub;
  if (!walletAddress) {
    throw new Error('Wallet address not found');
  }

  // Reuse Supabase client if it exists, otherwise create a new one
  if (!supabaseClient) {
    supabaseClient = createSupabaseServer();
  }

  // Only select necessary fields instead of '*' to reduce data transfer
  // Replace the fields below with the actual fields you need in your application
  const { data, error } = await supabaseClient
    .from('first-red')
    .select(
      'id, created_at, creator, image_url, response, result, pixel_similarity, conversation'
    )
    .eq('creator', walletAddress)
    .order('created_at', { ascending: false }); // Add order for consistent results

  if (error) {
    console.error('Error fetching user prompts:', error);
    throw new Error(`Failed to fetch user prompts: ${error.message}`);
  }

  return data as unknown as FirstRed[];
}
