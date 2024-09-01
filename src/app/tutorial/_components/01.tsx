"use client";

import React, { useEffect, useRef } from "react";

import Image from "next/image";

import ArrowAnimation from "../../../components/lottie/Arrow";
import { Button } from "../../../components/ui/Button";
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
        {/* 반투명 박스 */}
        <div className="relative flex h-1/3 w-full cursor-pointer items-center justify-center bg-black opacity-50 shadow-lg" />

        {/* 대화 */}
        <div className="absolute h-1/3 w-[60%] p-8 text-3xl text-white">
          (Ugh, what a day... I&apos;m totally beat.)
        </div>

        {/* 화살표 */}
        <div className="absolute left-[60%] z-20 flex h-1/3 w-[60px] items-end py-8 text-xl text-white">
          <div
            className="h-1/3 cursor-pointer text-xl text-white"
            onClick={increment}
          >
            <ArrowAnimation />
          </div>
        </div>

        {/* 스킵 버튼 */}
        <div className="absolute z-10 flex h-1/3 items-end p-8">
          <Button
            variant="outline"
            className="bg-transparent text-black text-white hover:bg-white"
            onClick={() => useCount.setState({ count: 6 })}
          >
            Skip
          </Button>
        </div>

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
