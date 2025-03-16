import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Red Flight NFT Market',
  description: 'AI Jailbreaking NFT Game',
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen bg-black font-sora text-white">
      <Image
        src="/background/02.png"
        alt="Background"
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className="relative z-10">{children}</div>
    </main>
  );
};

export default layout;
