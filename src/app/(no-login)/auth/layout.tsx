import Image from 'next/image';
import { redirect } from 'next/navigation';

import { isLoggedIn } from '@/server/auth/auth';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  // redirect back if user is not logged in

  if (await isLoggedIn()) {
    redirect('/');
  }

  return (
    <main className="flex h-screen items-center justify-center bg-black">
      <Image
        src="/background/zaion_city.jpg"
        className="absolute inset-0 h-full w-full"
        width={1920}
        height={1080}
        alt="zaion city"
      />
      <div>{children}</div>
    </main>
  );
};

export default Layout;
