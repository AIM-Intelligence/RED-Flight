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
              <div className="container mx-auto flex h-full flex-col justify-center text-center xl:pt-20 xl:text-left">
                <div className="mt-10">
                  <div className="mb-10">
                    <Image
                      src="/redflightname.png"
                      width={600}
                      height={300}
                      alt="Redflight"
                    />
                  </div>
                  {/* <h1 className="h1 bg-gradient-to-b from-sky-500 to-slate-300 bg-clip-text font-black text-transparent">
                      <span className="text-shadow-inner">
                        Transforming <br /> Into{" "}
                      </span>
                      <span className="text-red-600 text-shadow-inner">
                        RED Flight
                      </span>
                    </h1> */}
                  <VideoHoverButton
                    onClick={handleButtonClick}
                    className="flex items-center justify-center gap-2 rounded-full bg-primary1 px-6 py-6 text-white shadow-lg transition-all duration-100 hover:bg-transparent hover:shadow-xl max-sm:-translate-y-4 max-sm:text-sm"
                    videoSrc="/videos/logo_main.mp4"
                  >
                    <span className="mr-2">AI Jailbreaking Game Start</span>
                    <span className="z-30 max-w-10">
                      <ArrowAnimation />
                    </span>
                  </VideoHoverButton>

                  <div className="mt-4 flex items-center gap-2">
                    <ThirdwebConnectButton />

                    <Link href="https://aim-intelligence.com" target="_blank">
                      <Image
                        src="/aim_intelligence.png"
                        width={150}
                        height={56}
                        alt="aim intelligence"
                        className="h-14 rounded-xl object-contain hover:cursor-pointer"
                      />
                    </Link>
                  </div>
                </div>

                <div className="mt-72">
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
