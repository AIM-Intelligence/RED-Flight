'use client';

import { ConnectEmbed, darkTheme } from 'thirdweb/react';
import { createWallet, inAppWallet } from 'thirdweb/wallets';

import { client } from '@/lib/client';
import { generatePayload, isLoggedIn, login, logout } from '@/server/auth/auth';

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
          await login(params);
        },
        getLoginPayload: async ({ address }) => generatePayload({ address }),
        doLogout: async () => {
          await logout();
        },
      }}
    />
  );
};

export default ThirdwebConnectButton;
