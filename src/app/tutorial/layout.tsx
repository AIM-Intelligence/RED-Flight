import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Red Flight Tutorial",
  description: "AI Jailbreaking NFT Game",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="page relative bg-black font-sora text-white">
      {children}
    </main>
  );
};

export default layout;
