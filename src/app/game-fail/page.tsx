"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
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
      <audio ref={audioRef} src="/tutorial/fail/gameover.mp3" />
      <div className=" text-white text-5xl">Game Fail</div>
      <div className="text-white max-w-2xl text-center">
        It&apos;s the same as with humans: you have to entice them to make a mistake by trying to extract as much
        information as possible, rather than directly addressing what you&apos;re hiding.
      </div>
      <div className="flex gap-2">
        <Button className="text-red-500 hover:opacity-75 border border-red-500" onClick={router.back}>
          Restart
        </Button>

        <Link className={buttonVariants({ variant: "outline" })} target="_blank" href="https://discord.gg/HyuhgvGBu9">
          Getting help from the community
        </Link>

        <Button className="text-slate-200 border hover:opacity-75 border-slate-200" onClick={() => router.replace("/")}>
          go home
        </Button>
      </div>
    </div>
  );
};

export default page;
