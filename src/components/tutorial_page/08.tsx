"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import ArrowAnimation from "../lottie/arrow";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import GetToken from "./08-token";

const FirstImage = ({ onComplete }: any) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["I knew you could do it.", "But we're just getting started...", "It's time to get out the door"];

  const handleArrowClick = () => {
    if (currentTextIndex === texts.length - 1) {
      onComplete();
    } else {
      setCurrentTextIndex(prevIndex => (prevIndex + 1) % texts.length);
    }
  };

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
  // const { increment } = useCount();

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

            <div className="flex flex-col gap-2 ">
              <p className="text-center text-white max-w-md">
                Join us on Red Flight&apos;s journey toward a humanity coexisting with AI.{" "}
              </p>
              <Link
                className={cn(buttonVariants({ variant: "outline" }), "text-black")}
                // className="text-blue-500 border hover:opacity-75 border-blue-400"
                target="_blank"
                href="https://discord.gg/2JcTKhx8"
              >
                Join Discord Community
              </Link>
            </div>
            <div className="bg-gradient-to-r from-transparent via-red-600 to-transparent my-2 h-[2px] w-full" />

            <div className="flex flex-col gap-2 ">
              <p className="text-center text-white max-w-md">
                Get RED Fuel token and register your wallet address, we value this opportunity.
              </p>
              <GetToken />
            </div>

            <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "bg-transparent mt-2")}>
              Go Home
            </Link>

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
