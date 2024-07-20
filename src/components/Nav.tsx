"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiUser, HiViewColumns, HiRectangleGroup, HiEnvelope, HiInbox } from "react-icons/hi2";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// nav data
export const navData = [
  { name: "Home", path: "/", icon: <HiHome /> },
  { name: "My Page", path: "/my-page", icon: <HiUser /> },
  { name: "NFT Leaderboard", path: "/nft-leaderboard", icon: <HiRectangleGroup /> },
  { name: "User Leaderboard", path: "/user-leaderboard", icon: <HiViewColumns /> },
  {
    name: "NFT Gallery",
    path: "/nft-gallery",
    icon: <HiInbox />,
  },
  {
    name: "Staking NFT",
    path: "/my-staking-nft",
    icon: <HiEnvelope />,
  },
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
