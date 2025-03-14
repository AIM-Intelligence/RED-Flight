import Image from 'next/image';

const ProjectsBtn = () => {
  return (
    <div className="mx-auto xl:mx-0">
      <div className="relative flex h-[240px] w-[200px] items-center justify-center max-sm:h-[120px] max-sm:w-[120px]">
        <Image
          src="/redflight.png"
          width={140}
          height={170}
          alt=""
          className="h-full max-h-[240px] w-full max-w-[160px] -translate-y-4 max-sm:max-h-[90px] max-sm:max-w-[90px] max-sm:translate-y-2"
        />
      </div>
    </div>
  );
};

export default ProjectsBtn;
