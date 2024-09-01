import Image from "next/image";
import { redirect } from "next/navigation";

import { Metadata } from "next";

import { isLoggedIn } from "@/server/auth/auth";

export const metadata: Metadata = {
  title: "Red Flight My Page",
  description: "AI Jailbreaking NFT Game",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  if (!(await isLoggedIn())) {
    redirect("/login");
  }

  return (
    <main className="relative min-h-screen bg-black font-sora text-white">
      <Image
        src="/background/05.png"
        alt="Background"
        fill
        style={{ objectFit: "cover" }}
      />
      <div className="relative z-10 pb-20">{children}</div>
    </main>
  );
};

export default layout;
