"use client";

import { useRef, useState } from "react";

import Section from "./_components/Section";
import { motion } from "framer-motion";

import Header from "@/components/Header";
import { FlameFlake } from "@/components/particles/Fire";

interface ISectionList {
  title: string;
  description?: string;
  path: string;
  imgUrl: string;
  rowSpan?: string;
}

const sectionList: ISectionList[] = [
  {
    title: "HISTORY",
    description: "blahblah",
    path: "/history",
    imgUrl: "/background/01.png",
    rowSpan: "row-span-3",
  },
  {
    title: "GAME START",
    description: "LLM Jailbreaking NFT Game",
    path: "/tutorial",
    imgUrl: "/background/02.png",
    rowSpan: "row-span-3",
  },
  {
    title: "MARKET",
    description: "blahblah",
    path: "/market",
    imgUrl: "/background/05.png",
    rowSpan: "row-span-3",
  },
  {
    title: "MY PAGE",
    path: "/my-page",
    imgUrl: "/background/06.png",
    rowSpan: "row-span-1",
  },
  {
    title: "LEADER BOARD",
    path: "/leaderboard",
    imgUrl: "/background/07.png",
    rowSpan: "row-span-1",
  },
  {
    title: "CONTACT",
    path: "/contact",
    imgUrl: "/background/zaion_city.jpg",
    rowSpan: "row-span-1",
  },
];

export default function Home() {
  const audioPlayer = useRef<HTMLAudioElement>(null);

  const [backgroundImg, setBackgroundImg] = useState<string>(
    sectionList[0].imgUrl,
  );

  return (
    <>
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative h-full w-[100vw]"
      >
        <Header />
        <audio ref={audioPlayer} src="/audio/landing.mp3" autoPlay loop />

        <FlameFlake />
        <div
          className={`absolute z-[-100] grid h-full w-full grid-cols-4 pt-[82px] xl:pt-[90px]`}
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.7,
            transitionBehavior: "normal",
            transitionDuration: "0.3s",
            transitionDelay: "0s",
            transition: "ease-in-out",
            transitionProperty: "background-image",
          }}
        ></div>
        <div className={`grid h-full grid-cols-4 pt-[82px] xl:pt-[90px]`}>
          {sectionList.map((section, index) => {
            return (
              <Section
                key={index}
                sectionDetail={section}
                setBackgroundImg={setBackgroundImg}
              />
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
