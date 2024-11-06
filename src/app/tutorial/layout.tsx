import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { isLoggedIn } from '@/server/auth/auth';

export const metadata: Metadata = {
  title: 'Red Flight Tutorial',
  description: 'AI Jailbreaking NFT Game',
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  if (!(await isLoggedIn())) {
    redirect('/');
  }
  return (
    <main className="page relative bg-black font-sora text-white">
      {children}
    </main>
  );
};

export default layout;
