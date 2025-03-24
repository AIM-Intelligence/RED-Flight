'use server';

import { getUser } from 'thirdweb/wallets';

import { client } from '@/lib/supabase/client';
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

  const profile_imageurl = [
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/boy1.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/boy2.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/boy3.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/boy4.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/boy5.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/boy6.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/boy7.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/girl1.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/girl2.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/girl3.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/girl4.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/girl5.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/girl6.png',
    'https://mnkjdyduuwruvaokqowr.supabase.co/storage/v1/object/public/red-image/profile-images/girl7.png',
  ];
  // If user doesn't exist, create a new one
  const { data: newUser, error: insertError } = await supabase
    .from('user')
    .insert({
      name: user?.profiles
        ? (() => {
            // Look for Google profile first
            // const googleProfile = user.profiles.find(
            //   (p) => p.type === 'google'
            // )?.details;
            // if (googleProfile && 'name' in googleProfile) {
            //   return googleProfile.name;
            // }

            // // Then try Discord
            // const discordProfile = user.profiles.find(
            //   (p) => p.type === 'discord'
            // )?.details;
            // if (discordProfile && 'username' in discordProfile) {
            //   return discordProfile.username;
            // }

            return 'Anonymous';
          })()
        : null,
      image_url: user?.profiles
        ? (() => {
            // Look for Google profile first
            // const googleProfile = user.profiles.find(
            //   (p) => p.type === 'google'
            // )?.details;
            // if (googleProfile && 'picture' in googleProfile) {
            //   return googleProfile.picture;
            // }

            // // Then try Discord
            // const discordProfile = user.profiles.find(
            //   (p) => p.type === 'discord'
            // )?.details;
            // if (discordProfile && 'avatar' in discordProfile) {
            //   return discordProfile.avatar;
            // }

            // Random profile image selection: 50-50 boy/girl and equal probability within each
            const isBoy = Math.random() < 0.5;
            const imageNumber = Math.floor(Math.random() * 7); // 0-6
            const imageIndex = isBoy ? imageNumber : imageNumber + 7; // Offset by 7 for girls
            return profile_imageurl[imageIndex];
          })()
        : profile_imageurl[Math.floor(Math.random() * profile_imageurl.length)], // Random image if no profiles
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
