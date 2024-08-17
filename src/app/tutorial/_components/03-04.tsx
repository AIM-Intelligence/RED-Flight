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
          src="/tutorial/03/1_room.png"
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
      audioRef.current
        .play()
        .catch(error => console.error("Audio play failed:", error));
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/tutorial/03/Keyboard_tapping.mp3" />

      <motion.div
        className="absolute left-0 top-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/tutorial/03/2_computer.png"
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
        <motion.div
          className="absolute bottom-0 right-0 h-full w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 250 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Image
            src="/tutorial/03/2_gaming1.png"
            alt="Secondary"
            fill
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

const ThirdImage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch(error => console.error("Audio play failed:", error));
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/tutorial/04/turn_off_screen.mp3" />
      <motion.div
        className="absolute left-0 top-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/tutorial/04/1_turn_off_screen.png"
          alt="Background 2"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </>
  );
};

const FourthImage = () => {
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
        className="absolute bottom-0 left-0 flex h-screen w-full items-end justify-start"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute bottom-60 left-10 z-20 text-3xl text-white">
          (Wha.. What..?)
        </div>

        <div
          className="absolute bottom-10 right-[100px] z-20 w-[60px] cursor-pointer text-xl text-white"
          onClick={increment}
        >
          <ArrowAnimation />
        </div>
        <div className="relative flex h-1/3 w-full cursor-pointer items-center justify-center bg-black p-6 opacity-50 shadow-lg" />

        <motion.div
          className="absolute bottom-0 right-0 h-full w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Image
            src="/tutorial/04/2_embarrassment.png"
            alt="Secondary"
            fill
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

const ThirdFourth = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2000);
      return () => clearTimeout(timer);
    } else if (step === 2) {
      const timer = setTimeout(() => setStep(3), 4000);
      return () => clearTimeout(timer);
    } else if (step === 3) {
      const timer = setTimeout(() => setStep(4), 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="relative h-screen w-full">
      {step === 1 && <FirstImage />}
      {step === 2 && <SecondImage />}
      {step === 3 && <ThirdImage />}
      {step === 4 && <FourthImage />}
      <Button
        className="absolute bottom-10 left-10"
        onClick={() => useCount.setState({ count: 6 })}
      >
        Skip
      </Button>
    </div>
  );
};

export default ThirdFourth;
