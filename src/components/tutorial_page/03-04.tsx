"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import ArrowAnimation from "../lottie/arrow";
import { useCount } from "@/store/tutorial_store";

const FirstImage = () => {
  return (
    <>
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/tutorial/03/1_room.png" alt="Background 1" layout="fill" objectFit="cover" priority />
      </motion.div>
    </>
  );
};

const SecondImage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/tutorial/03/Keyboard_tapping.mp3" />

      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/tutorial/03/2_computer.png" alt="Background" layout="fill" objectFit="cover" priority />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-screen flex items-end justify-start"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.div
          className="absolute bottom-0 right-0 w-full h-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 250 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Image src="/tutorial/03/2_gaming1.png" alt="Secondary" layout="fill" objectFit="contain" />
        </motion.div>
      </motion.div>
    </>
  );
};

const ThirdImage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/tutorial/04/turn_off_screen.mp3" />
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/tutorial/04/1_turn_off_screen.png" alt="Background 2" layout="fill" objectFit="cover" priority />
      </motion.div>
    </>
  );
};

const FourthImage = () => {
  const { increment } = useCount();

  return (
    <>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-screen flex items-end justify-start"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute z-20 bottom-60 left-10 text-white text-3xl">(Wha.. What..?)</div>

        <div
          className="absolute z-20 bottom-10 right-[100px] text-white text-xl w-[60px] cursor-pointer"
          onClick={increment}
        >
          <ArrowAnimation />
        </div>
        <div className="bg-black opacity-50 w-full flex items-center justify-center shadow-lg cursor-pointer relative h-1/3 p-6" />

        <motion.div
          className="absolute bottom-0 right-0 w-full h-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Image src="/tutorial/04/2_embarrassment.png" alt="Secondary" layout="fill" objectFit="contain" />
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
    <div className="relative w-full h-screen">
      {step === 1 && <FirstImage />}
      {step === 2 && <SecondImage />}
      {step === 3 && <ThirdImage />}
      {step === 4 && <FourthImage />}
    </div>
  );
};

export default ThirdFourth;
