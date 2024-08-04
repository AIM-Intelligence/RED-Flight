"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import ArrowAnimation from "../lottie/Arrow";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";

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
          src="/tutorial/02/2_porch.png"
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
  return (
    <motion.div
      className="absolute left-0 top-0 h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Image
        src="/tutorial/02/1_hallway2.png"
        alt="Background 2"
        fill
        className="object-cover"
        priority
      />
    </motion.div>
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
        className="absolute left-0 top-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/tutorial/02/3_indoor.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 flex h-screen w-full items-end justify-start"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute bottom-60 left-10 z-20 text-3xl text-white">
          (I got nothing going on, so I might as well just game for a while...)
        </div>

        <div
          className="absolute bottom-10 right-[600px] z-20 w-[60px] cursor-pointer text-xl text-white"
          onClick={increment}
        >
          <ArrowAnimation />
        </div>
        <div className="relative flex h-1/3 w-full cursor-pointer items-center justify-center bg-black p-6 opacity-50 shadow-lg" />

        <motion.div
          className="absolute bottom-0 right-0 h-5/6 w-1/3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Image
            src="/tutorial/02/3_get_off_work.png"
            alt="Secondary"
            fill
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

const Second = () => {
  const [step, setStep] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch(error => console.error("Audio play failed:", error));
    }
  }, []);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 4000);
      return () => clearTimeout(timer);
    } else if (step === 2) {
      const timer = setTimeout(() => setStep(3), 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="relative h-screen w-full">
      <audio ref={audioRef} src="/tutorial/02/door_lock.mp3" />
      {step === 1 && <FirstImage />}
      {step === 2 && <SecondImage />}
      {step === 3 && <ThirdImage />}
      <Button
        className="absolute bottom-10 left-10"
        onClick={() => useCount.setState({ count: 6 })}
      >
        Skip
      </Button>
    </div>
  );
};

export default Second;
