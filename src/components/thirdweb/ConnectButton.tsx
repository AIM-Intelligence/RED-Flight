'use client';

import { ConnectButton } from 'thirdweb/react';
import { inAppWallet } from 'thirdweb/wallets';

import { client } from '@/lib/client';
import { generatePayload, isLoggedIn, login, logout } from '@/server/auth/auth';
import { getOrCreateWeb3User } from '@/server/auth/sign-in';

const ThirdwebConnectButton: React.FC = () => {
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
    // createWallet('io.metamask'),
  ];

  return (
    <ConnectButton
      client={client}
      appMetadata={appMetadata}
      wallets={wallets}
      connectModal={{ size: 'compact' }}
      auth={{
        isLoggedIn: async (address) => {
          console.log('checking if logged in!', { address });
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log('logging in!');
          await login(params);
          await getOrCreateWeb3User();
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
