import ProjectsBtn from "@/components/ProjectsBtn";

export default function Home() {
  return (
    <main className="h-full relative">
      <video
        autoPlay
        muted
        playsInline
        loop
        poster="/landing.png"
        className="fixed top-0 left-0 min-w-full min-h-full object-cover z-10"
      >
        <source src="/videos/landing_with.mp4" type="video/mp4" />
      </video>
      <audio src="/audio/landing.mp3" autoPlay loop />

      <div className=" z-20 relative">
        <div className="text-center flex flex-col justify-center xl:pt-20 xl:text-left h-full container  mx-auto">
          <div className="max-sm:mt-8">
            <h1 className="h1 max-xl:text-slate-500">
              Transforming <br /> Into <span className="text-accent1">RED Flight</span>
            </h1>
            <p className="text-white inline-block p-2 bg-primary1 rounded-full px-4 max-sm:text-sm max-sm:-translate-y-4">
              LLM Jailbreaking NFT Game
            </p>
          </div>
          <div className="flex justify-center relative xl:hidden mt-60">
            <ProjectsBtn />
          </div>

          <div className="mt-80">
            <ProjectsBtn />
          </div>
        </div>
      </div>
    </main>
  );
}
