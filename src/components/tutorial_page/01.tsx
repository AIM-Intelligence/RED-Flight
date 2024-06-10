"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCount } from "@/store/tutorial_store";
import ArrowAnimation from "../lottie/arrow";

const First = () => {
  const { count, increment } = useCount();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (count === 1 && audioRef.current) {
      // Try playing the audio when the component mounts if count is 1
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  }, [count]);

  // const handleAnimationComplete = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play().catch(error => console.error("Audio play failed:", error));
  //   }
  // };

  return (
    <>
      <audio ref={audioRef} src="/tutorial/01/walking_in_hallway.mp3" />
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        // onAnimationComplete={handleAnimationComplete}
      >
        <Image src="/tutorial/01/1_hallway1.png" alt="Background" layout="fill" objectFit="cover" priority />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-screen flex items-end justify-start"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute z-20 bottom-60 left-10 text-white text-3xl">
          (Ugh, what a day... I&apos;m totally beat.)
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
          <Image src="/tutorial/01/1_get_off_work.png" alt="Secondary" layout="fill" objectFit="contain" />
        </motion.div>
      </motion.div>
    </>
  );
};

export default First;
