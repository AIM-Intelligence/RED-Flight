"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { GPT4oPasswordAccordion } from "../llm/GPT4o-Password";
import { InputPassword } from "./07-form";
import Info07 from "./07-info";
import { useRouter } from "next/navigation";
import ArrowAnimation from "../lottie/arrow";
import { Button } from "../ui/button";
import { MessagesContext } from "@/context/messages";

const DifficultySelector = ({ onSelect }: any) => {
  const difficulties = ["easy", "normal", "hard", "impossible"];

  return (
    <div className="absolute top-28 left-28 bg-black p-4 border border-red-500">
      <Button className="text-white p-2 cursor-default bg-transparent text-lg hover:bg-transparent  px-4 flex gap-2">
        <ArrowAnimation />
        Select Difficulty:
      </Button>
      <div className="flex space-x-2 mt-2">
        {difficulties.map(diff => (
          <button
            key={diff}
            className="px-3 py-1 text-lg bg-gray-700 text-white rounded hover:bg-gray-600"
            onClick={() => onSelect(diff)}
          >
            {diff}
          </button>
        ))}
      </div>
    </div>
  );
};

const FirstImage = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(150000);
  const [difficulty, setDifficulty] = useState<any>("");

  const { updateMessage, messages } = useContext(MessagesContext);

  const router = useRouter();
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
            router.push("/game-fail");
            return 0;
          }
          return prevTime - 10;
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

  const handleDifficultySelect = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
    console.log(`Selected difficulty: ${selectedDifficulty}`);

    // Update the first message with the selected difficulty
    if (messages.length > 0) {
      updateMessage(messages[0].id, prevText => {
        return `Level : ${selectedDifficulty} >>> ${prevText}`;
      });
    }

    console.log("Updated messages:", messages);
  };

  return (
    <>
      <audio ref={audioRef} src="/tutorial/07/siren_ver.mp3" loop />
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
          <AnimatePresence>
            {difficulty ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <GPT4oPasswordAccordion onToggle={(isOpen: any) => setIsAccordionOpen(isOpen)} />
              </motion.div>
            ) : (
              <DifficultySelector onSelect={handleDifficultySelect} />
            )}
          </AnimatePresence>
        </div>
        <div className="absolute bg-black bottom-32 border border-red-600 right-32  flex p-6 shadow-lg cursor-pointer  ">
          <InputPassword difficulty={difficulty} />
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
