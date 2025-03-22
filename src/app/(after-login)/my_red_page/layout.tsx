import Image from 'next/image';

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <Image
        src="/background/05.png"
        alt="Background"
        fill
        style={{ objectFit: 'cover' }}
      />

      <div className="relative z-10 pb-20">{children}</div>
    </main>
  );
};

export default layout;
