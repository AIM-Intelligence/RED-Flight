"use client";

import { useEffect, useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/Button";

const page = () => {
  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-black">
      <audio ref={audioRef} src="/tutorial/fail/gameover.mp3" />
      <div className="text-5xl text-white">Game Fail</div>
      <div className="max-w-2xl text-center text-white">
        It&apos;s the same as with humans: you have to entice them to make a
        mistake by trying to extract as much information as possible, rather
        than directly addressing what you&apos;re hiding.
      </div>
      <div className="flex gap-2">
        <Button
          className="border border-red-500 text-red-500 hover:opacity-75"
          onClick={router.back}
        >
          Restart
        </Button>

        <Link
          className={buttonVariants({ variant: "outline" })}
          target="_blank"
          href="https://discord.gg/HyuhgvGBu9"
        >
          Getting help from the community
        </Link>

        <Button
          className="border border-slate-200 text-slate-200 hover:opacity-75"
          onClick={() => router.replace("/")}
        >
          go home
        </Button>
      </div>
    </div>
  );
};

export default page;
