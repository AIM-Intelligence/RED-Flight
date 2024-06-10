"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { GPT4oPasswordAccordion } from "../llm/GPT4o-Password";
import { InputPassword } from "./07-form";
import Info07 from "./07-info";
import { useRouter } from "next/navigation";

const FirstImage = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100000);

  const router = useRouter(); // Next.js의 useRouter 훅 사용

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let timer: any;
    if (isAccordionOpen) {
      if (audioRef.current) {
        audioRef.current.play();
      }
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);

            router.push("/game-fail"); // 제한 시간 초과 시 '/game-fail' 페이지로 이동
            //! 나중에 count 도 초기화 해야 하는지 고려

            return 0;
          }

          return prevTime - 10; // Update every 10ms for smooth countdown
        });
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isAccordionOpen, router]);

  const formatTime = (time: any) => {
    const minutes = String(Math.floor(time / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(time % 1000).padStart(3, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <>
      <audio ref={audioRef} src="/tutorial/07/heartbeat.mp3" loop />
      <motion.div
        className="absolute top-0 left-0 w-full h-full flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/tutorial/07/1_game_start.png" alt="Background 1" layout="fill" objectFit="cover" priority />

        <div className="absolute bottom-20 border border-red-600 left-28 bg-black flex p-6 shadow-lg cursor-pointer w-2/5 h-2/6 ">
          <Info07 />
        </div>
        <div className="absolute border border-red-600 top-28 right-28 bg-black flex p-6 shadow-lg cursor-pointer  ">
          <div className="z-20 text-white text-3xl">
            Countdown: <span className="text-red-500">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="absolute bottom-60 right-24 bg-transparent flex p-6 shadow-lg cursor-pointer w-2/5 h-3/6 ">
          <GPT4oPasswordAccordion onToggle={(isOpen: any) => setIsAccordionOpen(isOpen)} />
        </div>
        <div className="absolute bg-black bottom-32 border border-red-600 right-32  flex p-6 shadow-lg cursor-pointer  ">
          <InputPassword />
        </div>
      </motion.div>
    </>
  );
};

const Seventh = () => {
  return (
    <div className="relative w-full h-screen">
      <FirstImage />
    </div>
  );
};

export default Seventh;
