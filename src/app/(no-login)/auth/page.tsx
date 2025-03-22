'use client';

//! 여기서는 createWallet가 없어도 auth가 정상적으로 작동한다.
import { useRouter, useSearchParams } from 'next/navigation';
import { ConnectEmbed, darkTheme } from 'thirdweb/react';
import { createWallet, inAppWallet } from 'thirdweb/wallets';

import { client } from '@/lib/supabase/client';
import { generatePayload, isLoggedIn, login, logout } from '@/server/auth/auth';
import { getOrCreateWeb3User } from '@/server/auth/sign-in';

const ThirdwebConnectButton: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const appMetadata = {
    name: 'RED Flight',
    url: 'https://www.redflight.io',
    description: 'AI Red Teaming CTF Game',
    logoUrl: '/logo1.png',
  };

  const wallets = [
    inAppWallet({
      auth: {
        options: ['google', 'discord'],
      },
    }),
    createWallet('io.metamask'),
  ];

  return (
    <ConnectEmbed
      client={client}
      appMetadata={appMetadata}
      wallets={wallets}
      theme={darkTheme({
        colors: {
          accentText: 'hsl(0, 84%, 49%)',
        },
      })}
      auth={{
        isLoggedIn: async (address) => {
          console.log('checking if logged in!', { address });
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log('logging in!');
          await login(params);
          await getOrCreateWeb3User();

          // Check for redirect parameter and navigate if present
          const redirectPath = searchParams.get('redirect');
          if (redirectPath) {
            router.push(redirectPath);
          }
        },
        getLoginPayload: async ({ address }) => generatePayload({ address }),
        doLogout: async () => {
          console.log('logging out!');
          await logout();
        },
      }}
    />
  );
};

export default ThirdwebConnectButton;
