"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import ArrowAnimation from "../lottie/arrow";

const FirstImage = ({ onComplete }: any) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["첫번째 미션 달성을 축하해", "하지만 이제 시작이야.", "이제 그만 문 밖으로 나와"];

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
      <Image src="/tutorial/08/2_surprise.png" alt="Background 2" layout="fill" objectFit="cover" priority />
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
    </>
  );
};

const Eighth = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 4000);
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
