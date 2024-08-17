import Image from "next/image";

const ProjectsBtn = () => {
  return (
    <div className="mx-auto xl:mx-0">
      <div className="relative flex h-[200px] w-[200px] animate-spin-slow items-center justify-center bg-circleStar bg-cover bg-center bg-no-repeat max-sm:h-[120px] max-sm:w-[120px]">
        <Image
          src="/logo1.png"
          width={141}
          height={170}
          alt=""
          className="h-full max-h-[150px] w-full max-w-[141px] translate-y-4 max-sm:max-h-[90px] max-sm:max-w-[90px] max-sm:translate-y-2"
        />
      </div>
    </div>
  );
};

export default ProjectsBtn;
