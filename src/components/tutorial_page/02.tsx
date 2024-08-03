"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import ArrowAnimation from "../lottie/Arrow";
import { useCount } from "@/store/tutorial-store";
import { Button } from "../ui/Button";

const FirstImage = () => {
  return (
    <>
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/tutorial/02/2_porch.png" alt="Background 1" fill className="object-cover" priority />
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
      <Image src="/tutorial/02/1_hallway2.png" alt="Background 2" fill className="object-cover" priority />
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
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/tutorial/02/3_indoor.png" alt="Background" fill className="object-cover" priority />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-screen flex items-end justify-start"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute z-20 bottom-60 left-10 text-white text-3xl">
          (I got nothing going on, so I might as well just game for a while...)
        </div>

        <div
          className="absolute z-20 bottom-10 right-[600px] text-white text-xl w-[60px] cursor-pointer"
          onClick={increment}
        >
          <ArrowAnimation />
        </div>
        <div className="bg-black opacity-50 w-full flex items-center justify-center shadow-lg cursor-pointer relative h-1/3 p-6" />

        <motion.div
          className="absolute bottom-0 right-0 w-1/3 h-5/6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Image src="/tutorial/02/3_get_off_work.png" alt="Secondary" fill className="object-contain" />
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
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
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
    <div className="relative w-full h-screen">
      <audio ref={audioRef} src="/tutorial/02/door_lock.mp3" />
      {step === 1 && <FirstImage />}
      {step === 2 && <SecondImage />}
      {step === 3 && <ThirdImage />}
      <Button className="absolute bottom-10 left-10" onClick={() => useCount.setState({ count: 6 })}>
        Skip
      </Button>
    </div>
  );
};

export default Second;
