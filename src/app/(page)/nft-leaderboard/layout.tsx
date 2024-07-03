import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Red Flight NFT Market",
  description: "AI Jailbreaking NFT Game",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="page bg-black text-white font-sora flex items-center justify-center">
      <Image src="/background/01.png" alt="Background" layout="fill" objectFit="cover" quality={100} priority />
      {children}
    </main>
  );
};

export default layout;
