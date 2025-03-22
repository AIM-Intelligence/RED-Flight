'use client';

//! createWallet가 없어도 auth가 정상적으로 작동하지 않는 것에 대한 이슈를 보고 했다. 추후에 결과를 봐서 auth를 다시 활성화 하자.
//! 그 전까지는 Mypage를 들어가거나, 미션을 클리어 하면 DB에 저장될 수 있도록 하자.

//! createWallet는 그냥 무조건 있어야 한다. => 없으면 그냥 어떤 시나리오도 정상 작동하지 않는다. 이는 ConnectEmbed 도 마찬가지다.
//! ConnectEmbed에 createWallet이 없다면 새로고침시 Frontend에서 activeWallet가 백엔드와의 불일치 문제를 발생시킨다.

//! 근데 생각해보면 익명성을 위해서라도 지갑 로그인은 있을 만 한것 같기도 하다. => 일단 아래와 같이 진행 (이 방법밖에 없긴함)
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
