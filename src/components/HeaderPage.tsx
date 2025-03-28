'use client';

import { Suspense } from 'react';

import Socials from './Socials';
import ThirdwebConnectButton from './thirdweb/ConnectButton';

const HeaderPage = () => {
  return (
    <header className="absolute z-50 mt-4 flex h-[90px] w-full items-center px-0 max-sm:hidden">
      <div className="container mx-auto flex items-center justify-between gap-y-2 px-4 sm:flex-row sm:px-6 md:px-10 lg:px-40">
        <Suspense>
          <ThirdwebConnectButton />
        </Suspense>
        <Socials />
      </div>
    </header>
  );
};

export default HeaderPage;
