import Image from 'next/image';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="page flex items-center justify-center bg-black text-white">
      <Image
        src="/background/06.png"
        alt="Background"
        fill
        className="object-cover"
        quality={100}
      />
      {children}
    </main>
  );
};

export default layout;
