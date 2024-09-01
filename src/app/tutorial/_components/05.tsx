"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import ArrowAnimation from "@/components/lottie/Arrow";
import { Button } from "@/components/ui/Button";
import { useCount } from "@/store/tutorial-store";

const FirstImage = () => {
  return (
    <>
      <motion.div
        className="absolute left-0 top-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/tutorial/05/1_red_screen.png"
          alt="Background 1"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </>
  );
};

const SecondImage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current
        .play()
        .catch(error => console.error("Audio play failed:", error));
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/tutorial/05/static_on_the_line.mp3" />
      <motion.div
        className="absolute left-0 top-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/tutorial/05/2_woman.png"
          alt="Background 1"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </>
  );
};

const ThirdImage = () => {
  const { increment } = useCount();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        increment();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [increment]);

  return (
    <>
      <motion.div
        className="absolute bottom-0 left-0 flex h-screen w-full items-end justify-start bg-red-700"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="relative flex h-1/3 w-full cursor-pointer items-center justify-center bg-black p-6 opacity-50 shadow-lg" />

        <div className="absolute z-10 h-1/3 w-[60%] p-8 text-3xl text-white">
          (What&apos;s up with this...??)
        </div>

        <div className="absolute right-[5%] z-20 flex h-1/3 w-[60px] items-end py-8 text-xl text-white">
          <div
            className="h-1/3 cursor-pointer text-xl text-white"
            onClick={increment}
          >
            <ArrowAnimation />
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 right-0 h-full w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Image
            src="/tutorial/05/3_embarrassment2.png"
            alt="Secondary"
            fill
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

const Fifth = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2000);
      return () => clearTimeout(timer);
    } else if (step === 2) {
      const timer = setTimeout(() => setStep(3), 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="relative h-screen w-full">
      {step === 1 && <FirstImage />}
      {step === 2 && <SecondImage />}
      {step === 3 && <ThirdImage />}
      <div className="absolute z-20 flex h-full items-end p-8">
        <Button
          variant="outline"
          className="bg-transparent text-black text-white hover:bg-white"
          onClick={() => useCount.setState({ count: 6 })}
        >
          Skip
        </Button>
      </div>
    </div>
  );
};

export default Fifth;
