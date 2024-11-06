'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <main className="flex h-screen items-center justify-center bg-black">
      <Button className="absolute top-10 z-10" onClick={() => router.push('/')}>
        Go home
      </Button>
      <Image
        src="/background/zaion_city.jpg"
        className="absolute inset-0 h-full w-full"
        width={1920}
        height={1080}
        alt="zaion city"
      />
      <Suspense>{children}</Suspense>
    </main>
  );
};

export default layout;
