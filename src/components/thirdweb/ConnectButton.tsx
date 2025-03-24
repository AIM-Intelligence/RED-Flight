'use client';

import { ConnectButton, darkTheme } from 'thirdweb/react';
import { createWallet, inAppWallet } from 'thirdweb/wallets';

import { client } from '@/lib/supabase/client';
import { useGetOrCreateWeb3User } from '@/hooks/user/useGetOrCreateUser';
import { generatePayload, isLoggedIn, login, logout } from '@/server/auth/auth';

const ThirdwebConnectButton: React.FC = () => {
  const { syncUserProfile } = useGetOrCreateWeb3User();

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
    <ConnectButton
      client={client}
      appMetadata={appMetadata}
      wallets={wallets}
      autoConnect={true}
      // connectModal={{ size: 'wide' }}
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
          await syncUserProfile();
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
