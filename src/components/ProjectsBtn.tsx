import Image from 'next/image';

const ProjectsBtn = () => {
  return (
    <div className="mx-auto xl:mx-0">
      <div className="relative flex w-full items-center justify-center">
        {/* Container with responsive dimensions */}
        <div className="relative flex h-[120px] w-[120px] items-center justify-center sm:h-[180px] sm:w-[160px] md:h-[240px] md:w-[200px]">
          <Image
            src="/redflight.png"
            width={140}
            height={170}
            alt="Redflight logo"
            className="h-auto w-[90px] -translate-y-1 object-contain sm:w-[120px] sm:-translate-y-2 md:w-[160px] md:-translate-y-4"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsBtn;
