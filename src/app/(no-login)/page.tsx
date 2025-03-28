'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useActiveWallet } from 'thirdweb/react';

import Header from '@/components/Header';
import ArrowAnimation from '@/components/lottie/Arrow';
import { FlameFlake } from '@/components/particles/Fire';
import ProjectsBtn from '@/components/ProjectsBtn';
import ThirdwebConnectButton from '@/components/thirdweb/ConnectButton';
import { Button } from '@/components/ui/Button';

const VideoHoverButton: React.FC<any> = ({
  onClick,
  className,
  children,
  videoSrc,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div className="group relative inline-block">
      <Button
        onClick={onClick}
        className={` ${className} group-hover:bg-opacity/30 relative z-10 text-lg transition-all duration-300 group-hover:text-white`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </Button>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full rounded-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default function Home() {
  const audioPlayer = useRef<HTMLAudioElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  const activeWallet = useActiveWallet();

  const handleButtonClick = async () => {
    if (activeWallet) {
      router.push('/first_flight');
    } else {
      router.push('/auth?redirect=/first_flight');
    }
  };

  return (
    <>
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="h-full"
      >
        <audio ref={audioPlayer} src="/audio/landing.mp3" autoPlay loop />
        <Header />
        <motion.div key={pathname} className="h-full">
          <main className="relative h-full">
            <FlameFlake />
            <video
              autoPlay
              muted
              playsInline
              loop
              poster="/landing.png"
              className="fixed left-0 top-0 -z-10 min-h-full min-w-full object-cover"
            >
              <source src="/videos/landing_with.mp4" type="video/mp4" />
            </video>

            <div className="relative z-20">
              <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center md:items-start md:px-6 xl:pt-20 xl:text-left">
                <div className="mt-10 w-full max-w-[600px] md:mt-16">
                  <div className="mb-8 md:mb-10">
                    <Image
                      src="/redflightname.png"
                      width={600}
                      height={300}
                      alt="Redflight"
                      className="mx-auto w-full max-w-[400px] md:mx-0 md:max-w-[600px]"
                    />
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <VideoHoverButton
                      onClick={handleButtonClick}
                      className="flex items-center justify-center gap-2 rounded-full bg-primary1 px-4 py-4 text-sm text-white shadow-lg transition-all duration-100 hover:bg-transparent hover:shadow-xl sm:px-6 sm:py-6 sm:text-base md:text-lg"
                      videoSrc="/videos/logo_main.mp4"
                    >
                      <span className="mr-2">AI Jailbreaking Game Start</span>
                      <span className="z-30 max-w-8 sm:max-w-10">
                        <ArrowAnimation />
                      </span>
                    </VideoHoverButton>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <ThirdwebConnectButton />

                    <Link href="https://aim-intelligence.com" target="_blank">
                      <Image
                        src="/aim_intelligence.png"
                        width={150}
                        height={56}
                        alt="aim intelligence"
                        className="h-10 object-contain hover:cursor-pointer md:h-14"
                      />
                    </Link>
                  </div>
                </div>

                <div className="mt-36 max-sm:hidden md:mt-52 lg:mt-72">
                  <ProjectsBtn />
                </div>
              </div>
            </div>
          </main>
        </motion.div>
      </motion.div>
    </>
  );
}
