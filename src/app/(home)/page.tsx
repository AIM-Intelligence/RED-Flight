"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { motion } from "framer-motion";
import {
  ConnectButton,
  useActiveAccount,
  useConnectModal,
} from "thirdweb/react";

import Header from "@/components/Header";
import Nav from "@/components/Nav";
import ProjectsBtn from "@/components/ProjectsBtn";
import Intro from "@/components/intro/Intro";
import ArrowAnimation from "@/components/lottie/Arrow";
import LoadingAnimation from "@/components/lottie/Loading";
import { FlameFlake } from "@/components/particles/Fire";
import { Button } from "@/components/ui/Button";
import { client } from "@/lib/client";
import chainList from "@/utils/chain";

export default function Home() {
  const audioPlayer = useRef<HTMLAudioElement>(null);

  const [showPage, setShowPage] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const hasSeenIntro = localStorage.getItem("hasSeenIntro") ? true : false;

  const activeAccount = useActiveAccount();
  const { connect, isConnecting } = useConnectModal();

  const appMetadata = {
    name: "RED Flight",
    url: "https://www.redflight.io",
  };

  useEffect(() => {
    if (!hasSeenIntro) {
      setShowPage(false);
      localStorage.setItem("hasSeenIntro", "true");
    } else {
      setShowPage(true);
    }
  }, [hasSeenIntro]);

  const handleButtonClick = async () => {
    if (activeAccount) {
      router.push("/tutorial");
    } else {
      try {
        const wallet = await connect({ client, appMetadata }); // opens the connect modal
        console.log("connected to", wallet);
      } catch (error) {
        console.error("Failed to connect:", error);
        alert("Failed to connect");
      }
    }
  };

  return (
    <>
      {!showPage && <Intro setShowPage={setShowPage} />}

      {showPage && (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="h-full"
        >
          <audio ref={audioPlayer} src="/audio/landing.mp3" autoPlay loop />
          <Nav />
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
                  <div className="max-sm:mt-8">
                    <h1 className="h1 bg-gradient-to-b from-sky-500 to-slate-300 bg-clip-text font-black text-transparent">
                      <span className="text-shadow-inner">
                        Transforming <br /> Into{" "}
                      </span>
                      <span className="text-red-600 text-shadow-inner">
                        RED Flight
                      </span>
                    </h1>
                    <Button
                      onClick={handleButtonClick}
                      className="flex gap-2 rounded-full bg-primary1 p-2 px-4 text-white max-sm:-translate-y-4 max-sm:text-sm"
                    >
                      LLM Jailbreaking NFT Game
                      {isConnecting ? <LoadingAnimation /> : <ArrowAnimation />}
                    </Button>

                    <div className="mt-4">
                      <ConnectButton
                        appMetadata={appMetadata}
                        client={client}
                        chains={chainList}
                      />
                    </div>
                  </div>
                  <div className="relative mt-60 flex justify-center xl:hidden">
                    <ProjectsBtn />
                  </div>

                  <div className="mt-72">
                    <ProjectsBtn />
                  </div>
                </div>
              </div>
            </main>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
