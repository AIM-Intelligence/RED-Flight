"use client";

import React, { useEffect, useRef } from "react";

import Image from "next/image";

import ArrowAnimation from "../lottie/Arrow";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";

import { useCount } from "@/store/tutorial-store";

const First = () => {
  const { count, increment } = useCount();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (count === 1 && audioRef.current) {
      audioRef.current
        .play()
        .catch(error => console.error("Audio play failed:", error));
    }

    // Add event listener for keydown
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        increment();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [count, increment]);

  return (
    <>
      <audio ref={audioRef} src="/tutorial/01/walking_in_hallway.mp3" />
      <motion.div
        className="absolute left-0 top-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        // onAnimationComplete={handleAnimationComplete}
      >
        <Image
          src="/tutorial/01/1_hallway1.png"
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
          (Ugh, what a day... I&apos;m totally beat.)
        </div>

        <div
          className="absolute bottom-10 right-[600px] z-20 w-[60px] cursor-pointer text-xl text-white"
          onClick={increment}
        >
          <ArrowAnimation />
        </div>
        <div className="relative flex h-1/3 w-full cursor-pointer items-center justify-center bg-black p-6 opacity-50 shadow-lg" />

        <Button
          className="absolute bottom-10 left-10"
          onClick={() => useCount.setState({ count: 6 })}
        >
          Skip
        </Button>

        <motion.div
          className="absolute bottom-0 right-0 h-5/6 w-1/3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Image
            src="/tutorial/01/1_get_off_work.png"
            alt="Secondary"
            fill
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default First;
