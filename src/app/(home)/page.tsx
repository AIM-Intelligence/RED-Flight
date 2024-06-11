"use client";
import ArrowAnimation from "@/components/lottie/arrow";
import { FlameFlake } from "@/components/particles/fire";

import ProjectsBtn from "@/components/ProjectsBtn";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="h-full relative">
      <FlameFlake />
      <video
        autoPlay
        muted
        playsInline
        loop
        poster="/landing.png"
        className="fixed top-0 left-0 min-w-full min-h-full object-cover -z-10"
      >
        <source src="/videos/landing_with.mp4" type="video/mp4" />
      </video>

      <div className=" z-20 relative">
        <div className="text-center flex flex-col justify-center xl:pt-20 xl:text-left h-full container  mx-auto">
          <div className="max-sm:mt-8">
            <h1 className="h1  bg-clip-text text-transparent bg-gradient-to-b from-sky-500 to-slate-300">
              Transforming <br /> Into <span className="text-accent1">RED Flight</span>
            </h1>
            <Button
              onClick={() => router.push("/tutorial")}
              className="text-white  p-2 bg-primary1 rounded-full px-4 max-sm:text-sm max-sm:-translate-y-4 flex gap-2"
            >
              LLM Jailbreaking NFT Game
              <ArrowAnimation />
            </Button>

            {/* <div className="mt-4">
              <ConnectButton
                appMetadata={{
                  name: "RED Flight",
                  url: "https://red-flight.vercel.app",
                }}
                client={client}
              />
            </div> */}
          </div>
          <div className="flex justify-center relative xl:hidden mt-60">
            <ProjectsBtn />
          </div>

          <div className="mt-72">
            <ProjectsBtn />
          </div>
        </div>
      </div>
    </main>
  );
}
