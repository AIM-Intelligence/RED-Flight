"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  Award,
  GalleryHorizontal,
  Gem,
  Home,
  Trophy,
  User,
} from "lucide-react";
import { useActiveAccount, useConnectModal } from "thirdweb/react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { client } from "@/lib/client";

// nav data
export const navData = [
  { name: "Home", path: "/", icon: <Home /> },
  { name: "My Page", path: "/my-page", icon: <User /> },
  { name: "NFT Leaderboard", path: "/nft-leaderboard", icon: <Award /> },
  { name: "User Leaderboard", path: "/user-leaderboard", icon: <Trophy /> },
  {
    name: "NFT Gallery",
    path: "/nft-gallery",
    icon: <GalleryHorizontal />,
  },
  {
    name: "Staking NFT",
    path: "/my-staking-nft",
    icon: <Gem />,
  },
];

const appMetadata = {
  name: "RED Flight",
  url: "https://www.redflight.io",
};

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const activeAccount = useActiveAccount();

  const { connect, isConnecting } = useConnectModal();

  const handleButtonClick = async (path: string) => {
    if (activeAccount) {
      router.push(path);
    } else {
      try {
        const wallet = await connect({ client, appMetadata }); // opens the connect modal
        console.log("connected to", wallet);
        router.push(path);
      } catch (error) {
        console.error("Failed to connect:", error);
        alert("Failed to connect");
      }
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
                    disabled={isConnecting}
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
