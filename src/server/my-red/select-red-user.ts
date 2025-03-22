'use server';

import { createSupabaseServer } from '@/lib/supabase/createSupabaseAdmin';
import { Database } from '@/validation/types/supabase';
import { getAuthStatus } from '../auth/auth';

type User = Database['public']['Tables']['user']['Row'];

// Cache for Supabase client to avoid recreating it on every call
let supabaseClient: ReturnType<typeof createSupabaseServer> | null = null;

// Function to get current user's data
export async function getUser(): Promise<User> {
  // Check authentication status
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

  // Query the user table with the wallet address
  const { data, error } = await supabaseClient
    .from('user')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single(); // We expect a single user record

  if (error) {
    console.error('Error fetching user data:', error);
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }

  if (!data) {
    throw new Error('User not found');
  }

  return data as User;
}
