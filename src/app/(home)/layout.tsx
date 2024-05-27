"use client";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    audioPlayer.current?.play();
  }, []);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioPlayer.current) {
        audioPlayer.current.play().catch(error => {
          console.error("Audio play failed:", error);
        });
      }
      // 이벤트 리스너 제거
      document.removeEventListener("click", handleUserInteraction);
    };

    // 사용자 상호작용 이벤트 리스너 추가
    document.addEventListener("click", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  return (
    <main className="page bg-site text-white bg-cover bg-no-repeat font-sora relative">
      <audio ref={audioPlayer} src="/audio/landing.mp3" autoPlay loop />
      <Nav />
      <Header />
      <AnimatePresence mode="wait">
        <motion.div key={pathname} className="h-full">
          {/* <Transition /> */}

          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default layout;
