import Image from 'next/image';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen bg-black font-sora text-white">
      <Image
        src="/background/05.png"
        alt="Background"
        fill
        style={{ objectFit: 'cover' }}
      />
      {/* Pass userData to children via a data attribute that can be accessed client-side */}
      <div className="relative z-10 pb-20">
        {/* The userData will be available via React Server Component props */}
        {children}
      </div>
    </main>
  );
};

export default layout;
