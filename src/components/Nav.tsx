'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Crown,
  GalleryHorizontal,
  Home,
  Plane,
  Trophy,
  User,
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

// nav data
export const navData = [
  { name: 'Home', path: '/', icon: <Home /> },
  { name: 'First Flight', path: '/first_flight', icon: <Plane /> },
  { name: 'My RED Page', path: '/my_red_page', icon: <User /> },
  {
    name: 'Similarity Leaderboard',
    path: '/similarity_leaderboard',
    icon: <Trophy />,
  },
  {
    name: 'RED User Leaderboard',
    path: '/red_user_leaderboard',
    icon: <Crown />,
  },
  {
    name: 'Red Flight Story',
    path: '/red_flight_world',
    icon: <GalleryHorizontal />,
  },
];

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();

  // const handleButtonClick = async (path: string) => {
  //   if (activeWallet) {
  //     router.push(path);
  //   } else {
  //     router.push('/auth');
  //   }
  // };

  return (
    <nav className="fixed bottom-0 top-0 z-50 mt-auto flex h-max w-full flex-col items-center gap-y-4 text-white xl:right-[2%] xl:h-screen xl:w-16 xl:max-w-md xl:justify-center">
      <div className="flex h-[80px] w-full items-center justify-between gap-y-10 bg-white/10 px-4 py-8 text-3xl backdrop-blur-sm md:px-40 xl:h-max xl:flex-col xl:justify-center xl:rounded-full xl:px-0 xl:text-xl">
        <TooltipProvider>
          {navData.map((link, index) => {
            return (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => router.push(link.path)}
                    className={`${
                      link.path === pathname && 'text-accent1'
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
