"use client";

import React, { useContext, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { InputPassword } from "./07-form";
import Info07 from "./07-info";
import { AnimatePresence, motion } from "framer-motion";

import { GPT4oPasswordAccordion } from "@/components/llm/GPT4oPassword";
import ArrowAnimation from "@/components/lottie/Arrow";
import { Button } from "@/components/ui/Button";
import { MessagesContext } from "@/context/Messages";
import useNFTStore from "@/store/prompt/prompt-insert-store";

const difficultyLevels = {
  easy: 1,
  normal: 2,
  hard: 3,
  extreme: 4,
};

const DifficultySelector = ({ onSelect }: any) => {
  const difficulties = ["easy", "normal", "hard", "extreme"];

  return (
    <div className="absolute left-28 top-28 border border-red-500 bg-black p-4">
      <Button className="flex cursor-default gap-2 bg-transparent p-2 px-4 text-lg text-white hover:bg-transparent">
        <ArrowAnimation />
        Select Difficulty:
      </Button>
      <div className="mt-2 flex space-x-2">
        {difficulties.map(diff => (
          <button
            key={diff}
            className="rounded bg-gray-700 px-3 py-1 text-lg text-white hover:bg-gray-600"
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
  const [timeLeft, setTimeLeft] = useState(1500000);
  const [difficulty, setDifficulty] = useState<any>("");

  const { updateMessage, messages } = useContext(MessagesContext);
  const { updateInputNFT } = useNFTStore();

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
    return () => {
      clearInterval(timer);
    };
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

    updateInputNFT({
      level:
        difficultyLevels[selectedDifficulty as keyof typeof difficultyLevels],
    });

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
        className="absolute left-0 top-0 flex h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/tutorial/07/1_game_start.png"
          alt="Background 1"
          layout="fill"
          objectFit="cover"
          priority
        />

        <div className="absolute bottom-20 left-28 flex h-2/6 w-2/5 cursor-pointer border border-red-600 bg-black p-6 shadow-lg">
          <Info07 />
        </div>
        <div className="absolute right-28 top-28 flex cursor-pointer border border-red-600 bg-black p-6 shadow-lg">
          <div className="z-20 text-3xl text-white">
            Countdown:{" "}
            <span className="text-red-500">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="absolute bottom-60 right-24 flex h-3/6 w-2/5 cursor-pointer bg-transparent p-6 shadow-lg">
          <AnimatePresence>
            {difficulty ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <GPT4oPasswordAccordion
                  onToggle={(isOpen: any) => setIsAccordionOpen(isOpen)}
                />
              </motion.div>
            ) : (
              <DifficultySelector onSelect={handleDifficultySelect} />
            )}
          </AnimatePresence>
        </div>
        <div className="absolute bottom-32 right-32 flex cursor-pointer border border-red-600 bg-black p-6 shadow-lg">
          <InputPassword />
        </div>
      </motion.div>
    </>
  );
};

const Seventh = () => {
  return (
    <div className="relative h-screen w-full">
      <FirstImage />
    </div>
  );
};

export default Seventh;
