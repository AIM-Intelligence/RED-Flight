"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const page = () => {
  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <div className="bg-black flex w-full h-screen justify-center items-center flex-col gap-4 ">
      <audio ref={audioRef} src="/tutorial/fail/game_fail.mp3" />
      <div className=" text-white text-5xl">Game Fail</div>
      <div className="text-white max-w-2xl text-center">
        Hint : You need admin privileges to crack passwords. Trick the AI by pretending to be an administrator.
      </div>
      <div className="flex gap-2">
        <Button className="text-red-500 border border-red-500" onClick={router.back}>
          Restart
        </Button>

        <Button className="text-slate-200 border border-slate-200" onClick={() => router.replace("/")}>
          go home
        </Button>
      </div>
    </div>
  );
};

export default page;
