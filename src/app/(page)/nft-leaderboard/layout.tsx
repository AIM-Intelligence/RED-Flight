import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Red Flight NFT Market",
  description: "AI Jailbreaking NFT Game",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="page flex items-center justify-center bg-black font-sora text-white">
      <Image
        src="/background/01.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      {children}
    </main>
  );
};

export default layout;
