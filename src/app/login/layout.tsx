"use client";

import { Suspense } from "react";

import Image from "next/image";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen items-center justify-center bg-black">
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
