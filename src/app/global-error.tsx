'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <html>
      <body className="flex h-screen items-center justify-center bg-black">
        <Image
          src="/background/blue2.png"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          width={1920}
          height={1080}
          alt="zaion city"
        />
        <h2 className="text-3xl">Something went wrong!</h2>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
