"use client";

import { usePathname, useRouter } from "next/navigation";

import { Award, GalleryHorizontal, Home, Trophy, User } from "lucide-react";
import { useActiveWallet } from "thirdweb/react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { useWeb3UserStore } from "@/store/user-store";

// nav data
export const navData = [
  { name: "Home", path: "/", icon: <Home /> },
  { name: "My RED Page", path: "/my-red-page", icon: <User /> },
  {
    name: "RED Prompt Leaderboard",
    path: "/red-prompt-leaderboard",
    icon: <Award />,
  },
  {
    name: "RED User Leaderboard",
    path: "/red-user-leaderboard",
    icon: <Trophy />,
  },
  {
    name: "RED NFT Checker Owner",
    path: "/red-nft-owner",
    icon: <GalleryHorizontal />,
  },
];

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const activeWallet = useActiveWallet();
  const { user } = useWeb3UserStore();

  const handleButtonClick = async (path: string) => {
    if (path === "/" || (user && activeWallet)) {
      router.push(path);
    } else {
      alert("Connect Wallet first");
    }
  };

  return (
    <nav className="fixed bottom-0 top-0 z-50 mt-auto flex h-max w-full flex-col items-center gap-y-4 xl:right-[2%] xl:h-screen xl:w-16 xl:max-w-md xl:justify-center">
      <div className="flex h-[80px] w-full items-center justify-between gap-y-10 bg-white/10 px-4 py-8 text-3xl backdrop-blur-sm md:px-40 xl:h-max xl:flex-col xl:justify-center xl:rounded-full xl:px-0 xl:text-xl">
        <TooltipProvider>
          {navData.map((link, index) => {
            return (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleButtonClick(link.path)}
                    className={`${
                      link.path === pathname && "text-accent1"
                    } group relative flex items-center transition-all duration-300 hover:text-accent1`}
                  >
                    <div>{link.icon}</div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left" className="border-red-500 bg-black">
                  <p className="text-red-500">{link.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default Nav;
