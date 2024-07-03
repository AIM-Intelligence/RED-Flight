"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiUser, HiViewColumns, HiRectangleGroup, HiEnvelope, HiInbox } from "react-icons/hi2";

// nav data
export const navData = [
  { name: "home", path: "/", icon: <HiHome /> },
  { name: "My Page", path: "/my-page", icon: <HiUser /> },
  { name: "NFT Leaderboard", path: "/nft-leaderboard", icon: <HiRectangleGroup /> },
  { name: "User Leaderboard", path: "/user-leaderboard", icon: <HiViewColumns /> },
  {
    name: "nft-gallery",
    path: "/nft-gallery",
    icon: <HiInbox />,
  },
  {
    name: "contact",
    path: "#",
    icon: <HiEnvelope />,
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen ">
      <div className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[80px]  xl:h-max py-8 bg-white/10 backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full">
        {navData.map((link, index) => {
          return (
            <Link
              href={link.path}
              key={index}
              className={`${link.path === pathname && "text-accent1"} relative flex items-center group hover:text-accent1 transition-all duration-300`}
            >
              <div>{link.icon}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
