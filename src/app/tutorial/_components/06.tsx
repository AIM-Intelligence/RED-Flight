"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import ArrowAnimation from "@/components/lottie/Arrow";
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
          src="/tutorial/06/1_game_loading.png"
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

    // Cleanup function to pause all audios when component unmounts
    return () => {
      audioRefs.current.forEach(audio => audio.pause());
    };
  }, []);

  const handleArrowClick = () => {
    // Pause the current audio
    audioRefs.current[currentTextIndex].pause();
    audioRefs.current[currentTextIndex].currentTime = 0;

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
          src="/tutorial/06/2_game_start.png"
          alt="Background 1"
          fill
          className="object-cover"
          priority
        />

        <div className="border-1 relative mb-20 flex h-1/4 w-3/5 cursor-pointer items-center justify-center border border-red-500 bg-black shadow-lg">
          <div className="z-20 px-6 text-3xl text-white">
            {texts[currentTextIndex]}
          </div>

          <div
            className="absolute bottom-10 right-[60px] z-20 w-[40px] cursor-pointer text-xl text-white"
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
    <div className="relative h-screen w-full">
      {step === 1 && <FirstImage />}
      {step === 2 && <SecondImage />}
    </div>
  );
};

export default Sixth;
