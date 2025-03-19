'use server';

import { getUser } from 'thirdweb/wallets';

import { client } from '@/lib/client';
import { createSupabaseServer } from '@/lib/supabase/createSupabaseAdmin';
import { Database } from '@/validation/types/supabase';
import { getAuthStatus } from './auth';

type User = Database['public']['Tables']['user']['Row'];

export async function getOrCreateWeb3User(): Promise<User> {
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error('User is not logged in');
  }

  const walletAddress = authStatus.walletAddress?.parsedJWT.sub;

  if (!walletAddress) {
    throw new Error('Wallet address not found');
  }

  // Get user profiles using thirdweb
  const user = await getUser({
    client,
    walletAddress: walletAddress,
  });

  // Create Supabase client
  const supabase = createSupabaseServer();

  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error('Failed to fetch user data');
  }

  if (data) {
    return data as User;
  }

  //! Need to check data properly set
  // If user doesn't exist, create a new one
  const { data: newUser, error: insertError } = await supabase
    .from('user')
    .insert({
      // name: user.profiles
      login_profiles: user?.profiles ? user.profiles : null,
      wallet_address: walletAddress,
      email: user?.email && user.email.length > 0 ? user.email : null,
    })
    .select()
    .single();

  if (insertError) {
    throw new Error('Failed to create new user');
  }

  return newUser as User;
}
