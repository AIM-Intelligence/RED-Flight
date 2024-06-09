"use client";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const videoPlayer = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();
  const [showPage, setShowPage] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const handleVideoEnded = () => {
      setVideoEnded(true);
    };

    if (videoPlayer.current) {
      videoPlayer.current.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (videoPlayer.current) {
        videoPlayer.current.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, []);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioPlayer.current) {
        audioPlayer.current.play().catch(error => {
          console.error("Audio play failed:", error);
        });
      }
      setShowPage(true);
      document.removeEventListener("click", handleUserInteraction);
    };

    if (videoEnded) {
      document.addEventListener("click", handleUserInteraction);
    }

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, [videoEnded]);

  return (
    <main className="page text-white font-sora relative">
      {!showPage && (
        <div className="w-full h-full flex items-center justify-center">
          {/* <video ref={videoPlayer} src="/videos/logo_main.mp4" autoPlay className="w-full h-full object-cover" /> */}

          <video ref={videoPlayer} autoPlay muted playsInline className="w-full h-full object-cover">
            <source src="/videos/logo_main.mp4" type="video/mp4" />
          </video>

          {videoEnded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl cursor-pointer">
              Click to start
            </div>
          )}
        </div>
      )}
      {showPage && (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="h-full"
        >
          <audio ref={audioPlayer} src="/audio/landing.mp3" autoPlay loop />
          <Nav />
          <Header />
          <motion.div key={pathname} className="h-full">
            {children}
          </motion.div>
        </motion.div>
      )}
    </main>
  );
};

export default layout;
