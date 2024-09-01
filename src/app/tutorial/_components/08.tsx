"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import ArrowAnimation from "@/components/lottie/Arrow";
import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCount } from "@/store/tutorial-store";

const FirstImage = ({ onComplete }: any) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = [
    "I knew you could do it.",
    "But we're just getting started...",
    "It's time to get out the door",
  ];
  const audioFiles = [
    "/tutorial/08/first.mp3",
    "/tutorial/08/second.mp3",
    "/tutorial/08/third.mp3",
  ];
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
        className="absolute left-0 top-0 flex h-full w-full items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/tutorial/08/1_game_start.png"
          alt="Background 1"
          layout="fill"
          objectFit="cover"
          priority
        />

        <div className="border-1 relative mb-20 flex h-1/4 w-3/5 cursor-pointer items-center justify-center border border-red-500 bg-black shadow-lg">
          <div className="z-20 text-3xl text-white">
            {texts[currentTextIndex]}
          </div>

          <div
            className="absolute bottom-10 right-[60px] z-20 w-[40px] cursor-pointer text-xl text-white"
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
      className="absolute left-0 top-0 h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <video
        src="/videos/redflight.mp4"
        autoPlay
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
    </motion.div>
  );
};

const ThirdImage = () => {
  const router = useRouter();
  const { setCount } = useCount();

  const handleGoHome = () => {
    setCount(1);
    router.push("/");
  };

  return (
    <>
      <motion.div
        className="absolute left-0 top-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/tutorial/08/3_begin.png"
          alt="Background 2"
          layout="fill"
          objectFit="cover"
          priority
        />
      </motion.div>

      <motion.div
        className="flex h-screen w-full items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="relative flex w-1/3 items-center justify-center bg-black/80 p-6 py-10 shadow-lg">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-2xl text-white">
              Thank you for Playing RED Flight Demo!
            </p>

            <div className="my-2 h-[2px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />

            <div className="flex flex-col gap-4">
              <p className="max-w-md text-center text-white">
                Join us on Red Flight&apos;s journey toward a humanity
                coexisting with AI.{" "}
              </p>

              <Button
                asChild
                className="inline-flex h-10 animate-shimmer cursor-pointer items-center justify-center rounded-md border border-red-600 bg-[linear-gradient(110deg,#c81919,45%,#a90909,55%,#c81919)] bg-[length:200%_100%] px-6 font-medium text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-50"
              >
                <div className="flex gap-2">
                  <Link target="_blank" href="https://discord.gg/HyuhgvGBu9">
                    Join RED Flight Discord
                  </Link>
                  <FaDiscord className="h-6 w-6" />
                </div>
              </Button>

              <Button
                asChild
                className="inline-flex h-10 animate-shimmer cursor-pointer items-center justify-center rounded-md border border-red-600 bg-[linear-gradient(110deg,#c81919,45%,#a90909,55%,#c81919)] bg-[length:200%_100%] px-6 font-medium text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-50"
              >
                <div className="flex gap-2">
                  <Link target="_blank" href="https://x.com/redflightAI">
                    Follow RED Flight X
                  </Link>
                  <FaXTwitter className="h-6 w-6" />
                </div>
              </Button>

              <Button
                asChild
                className="inline-flex h-10 animate-shimmer cursor-pointer items-center justify-center rounded-md border border-red-600 bg-[linear-gradient(110deg,#c81919,45%,#a90909,55%,#c81919)] bg-[length:200%_100%] px-6 font-medium text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-50"
              >
                <div className="flex gap-2">
                  <Link
                    target="_blank"
                    href="https://www.instagram.com/redflightai"
                  >
                    Follow RED Flight Instagram
                  </Link>
                  <FaXTwitter className="h-6 w-6" />
                </div>
              </Button>
            </div>
            <div className="my-2 h-[2px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />

            <div className="grid w-full grid-cols-2 items-center gap-4">
              <Button
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full bg-transparent",
                )}
                onClick={handleGoHome}
              >
                Go Home
              </Button>

              <Button
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full"
              >
                Replay
              </Button>
            </div>
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
    <div className="relative h-screen w-full">
      {step === 1 && <FirstImage onComplete={() => setStep(2)} />}
      {step === 2 && <SecondImage />}
      {step === 3 && <ThirdImage />}
    </div>
  );
};

export default Eighth;
//<FirstImage onComplete={() => setStep(2)} />
