import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Red Flight Tutorial",
  description: "AI Jailbreaking NFT Game",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="page text-white font-sora relative">{children}</main>;
};

export default layout;
