"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import ArrowAnimation from "../lottie/arrow";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import GetToken from "./08-token";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const FirstImage = ({ onComplete }: any) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["I knew you could do it.", "But we're just getting started...", "It's time to get out the door"];
  const audioFiles = ["/tutorial/08/first.mp3", "/tutorial/08/second.mp3", "/tutorial/08/third.mp3"];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioFiles[currentTextIndex]);
    audioRef.current.play();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTextIndex]);

  const handleArrowClick = () => {
    if (currentTextIndex === texts.length - 1) {
      onComplete();
    } else {
      setCurrentTextIndex(prevIndex => (prevIndex + 1) % texts.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleArrowClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleArrowClick]);

  return (
    <>
      <motion.div
        className="absolute top-0 left-0 w-full h-full flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/tutorial/08/1_game_start.png" alt="Background 1" layout="fill" objectFit="cover" priority />

        <div className="bg-black border border-1 border-red-500 flex items-center justify-center shadow-lg cursor-pointer relative w-3/5 h-1/4 mb-20">
          <div className="z-20 text-white text-3xl">{texts[currentTextIndex]}</div>

          <div
            className="absolute z-20 bottom-10 right-[60px] text-white text-xl w-[40px] cursor-pointer"
            onClick={handleArrowClick}
          >
            <ArrowAnimation />
          </div>
        </div>
      </motion.div>
    </>
  );
};

const SecondImage = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <video src="/videos/redflight.mp4" autoPlay className="absolute top-0 left-0 w-full h-full object-cover" />
    </motion.div>
  );
};

const ThirdImage = () => {
  return (
    <>
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/tutorial/08/3_begin.png" alt="Background 2" layout="fill" objectFit="cover" priority />
      </motion.div>

      <motion.div
        className=" w-full h-screen flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="bg-black/80 flex items-center justify-center shadow-lg  relative w-1/3  p-6 py-10">
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-white text-2xl">Thank you for Playing RED Flight Demo!</p>

            <div className="bg-gradient-to-r from-transparent via-red-600 to-transparent my-2 h-[2px] w-full" />

            <div className="flex flex-col gap-4 ">
              <p className="text-center text-white max-w-md">
                Join us on Red Flight&apos;s journey toward a humanity coexisting with AI.{" "}
              </p>

              <Button
                asChild
                className="inline-flex cursor-pointer h-10 animate-shimmer items-center justify-center rounded-md border border-red-600 bg-[linear-gradient(110deg,#c81919,45%,#a90909,55%,#c81919)] bg-[length:200%_100%] px-6 font-medium text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-50 "
              >
                <div className="flex gap-2">
                  <Link target="_blank" href="https://discord.gg/HyuhgvGBu9">
                    Join RED Flight Community
                  </Link>
                  <FaDiscord className="w-6 h-6" />
                </div>
              </Button>

              <Button
                asChild
                className="inline-flex h-10 cursor-pointer animate-shimmer items-center justify-center rounded-md border border-red-600 bg-[linear-gradient(110deg,#c81919,45%,#a90909,55%,#c81919)] bg-[length:200%_100%] px-6 font-medium text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-50 "
              >
                <div className="flex gap-2">
                  <Link target="_blank" href="https://x.com/redflightAI">
                    Follow RED Flight News
                  </Link>
                  <FaXTwitter className="w-6 h-6" />
                </div>
              </Button>
            </div>
            <div className="bg-gradient-to-r from-transparent via-red-600 to-transparent my-2 h-[2px] w-full" />

            <div className="flex flex-col gap-2 ">
              <p className="text-center text-white max-w-md">Create your Prompt NFT and leave mark on RED Flight.</p>
              <GetToken />
            </div>
            <div className="grid grid-cols-2 w-full gap-4 items-center">
              <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "bg-transparent w-full")}>
                Go Home
              </Link>

              <Button
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full"
              >
                Replay
              </Button>
            </div>

            {/* <div className="text-white text-xl w-[60px] cursor-pointer">
            <ArrowAnimation />
          </div> */}
          </div>
        </div>
      </motion.div>
    </>
  );
};

const Eighth = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 13000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="relative w-full h-screen">
      {step === 1 && <FirstImage onComplete={() => setStep(2)} />}
      {step === 2 && <SecondImage />}
      {step === 3 && <ThirdImage />}
    </div>
  );
};

export default Eighth;
//<FirstImage onComplete={() => setStep(2)} />
