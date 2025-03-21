'use server';

import { cookies } from 'next/headers';
import { createAuth, VerifyLoginPayloadParams } from 'thirdweb/auth';
import { privateKeyToAccount } from 'thirdweb/wallets';

import { client } from '@/lib/supabase/client';

const privateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY || '';

if (!privateKey) {
  throw new Error('Missing THIRDWEB_ADMIN_PRIVATE_KEY in .env file.');
}

const thirdwebAuth = createAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || '',
  adminAccount: privateKeyToAccount({ client, privateKey }),
  client: client,
});

export const generatePayload = thirdwebAuth.generatePayload;

export async function login(payload: VerifyLoginPayloadParams) {
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
  if (verifiedPayload.valid) {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    });
    cookies().set('jwt', jwt);
  }
}

export async function isLoggedIn() {
  const jwt = cookies().get('jwt');
  if (!jwt?.value) {
    return false;
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });

  return authResult.valid;
}

export async function logout() {
  cookies().delete('jwt');
}

export async function getAuthStatus() {
  const jwt = cookies().get('jwt');
  if (!jwt?.value) {
    return { isLoggedIn: false, walletAddress: null };
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    return { isLoggedIn: false, walletAddress: null };
  }

  return {
    isLoggedIn: true,
    walletAddress: authResult,
  };
}
