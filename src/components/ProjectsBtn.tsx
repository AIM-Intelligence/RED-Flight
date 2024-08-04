import Image from "next/image";
import Link from "next/link";

const ProjectsBtn = () => {
  return (
    <div className="mx-auto xl:mx-0">
      <Link
        href="#"
        className="relative flex h-[200px] w-[200px] animate-spin-slow items-center justify-center bg-circleStar bg-cover bg-center bg-no-repeat max-sm:h-[120px] max-sm:w-[120px]"
      >
        <Image
          src="/logo2.png"
          width={141}
          height={170}
          alt=""
          className="h-full max-h-[150px] w-full max-w-[141px] translate-y-4 max-sm:max-h-[90px] max-sm:max-w-[90px] max-sm:translate-y-2"
        />
      </Link>
    </div>
  );
};

export default ProjectsBtn;
