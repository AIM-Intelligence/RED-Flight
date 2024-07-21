"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, GalleryHorizontal, Gem, Trophy, User, Home } from "lucide-react";

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
  // {
  //   name: "Unity Demo",
  //   path: "/my-staking-nft",
  //   icon: <Box />,
  // },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen ">
      <div className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[80px]  xl:h-max py-8 bg-white/10 backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full">
        <TooltipProvider>
          {navData.map((link, index) => {
            return (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.path}
                    className={`${link.path === pathname && "text-accent1"} relative flex items-center group hover:text-accent1 transition-all duration-300`}
                  >
                    <div>{link.icon}</div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-black border-red-500">
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
