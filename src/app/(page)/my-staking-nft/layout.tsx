import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Red Flight My Page',
  description: 'AI Jailbreaking NFT Game',
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="page flex items-center justify-center bg-black font-sora text-white">
      <Image
        src="/background/07.png"
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
