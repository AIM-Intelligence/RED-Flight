"use client";
import React, { useEffect, useState, useRef } from "react";
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
        <Image src="/tutorial/06/1_game_loading.png" alt="Background 1" layout="fill" objectFit="cover" priority />
      </motion.div>
    </>
  );
};

const SecondImage = () => {
  const { increment } = useCount();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const audioRefs = useRef([
    new Audio("/tutorial/06/first_dial.mp3"),
    new Audio("/tutorial/06/second_dial.mp3"),
    new Audio("/tutorial/06/third_dial.mp3"),
  ]);
  const texts = [
    "I hate to spring this on you, but I'm in a bit of a time crunch.",
    "Look, I don't want to alarm you, but we've got a situation. Hostile forces have interfered with our communication.",
    "I'm going to give you some intel, and I need you to handle it, okay?",
  ];

  useEffect(() => {
    // Play the first audio when the component mounts
    audioRefs.current[0].play();
  }, []);

  const handleArrowClick = () => {
    if (currentTextIndex < texts.length - 1) {
      const nextIndex = currentTextIndex + 1;
      setCurrentTextIndex(nextIndex);
      audioRefs.current[nextIndex].play();

      if (nextIndex === texts.length - 1) {
        setShowNextButton(true);
      }
    } else if (showNextButton) {
      increment();
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
        <Image src="/tutorial/06/2_game_start.png" alt="Background 1" layout="fill" objectFit="cover" priority />

        <div className="bg-black border border-1 border-red-500 flex items-center justify-center shadow-lg cursor-pointer relative w-3/5 h-1/4 mb-20">
          <div className="z-20 text-white text-3xl px-6">{texts[currentTextIndex]}</div>

          <div
            className="absolute z-20 bottom-10 right-[60px] text-white text-xl w-[40px] cursor-pointer"
            onClick={handleArrowClick}
          >
            {showNextButton ? "O..Okay.." : <ArrowAnimation />}
          </div>
        </div>
      </motion.div>
    </>
  );
};

const Sixth = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="relative w-full h-screen">
      {step === 1 && <FirstImage />}
      {step === 2 && <SecondImage />}
    </div>
  );
};

export default Sixth;
