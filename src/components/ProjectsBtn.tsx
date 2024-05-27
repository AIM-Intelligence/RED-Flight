import Image from "next/image";
import Link from "next/link";

const ProjectsBtn = () => {
  return (
    <div className="mx-auto xl:mx-0">
      <Link
        href="#"
        className="relative max-sm:w-[120px] max-sm:h-[120px] w-[200px] h-[200px] flex justify-center items-center animate-spin-slow bg-circleStar bg-cover bg-center bg-no-repeat "
      >
        <Image
          src="/logo_red.png"
          width={141}
          height={170}
          alt=""
          className=" w-full h-full max-sm:max-w-[90px] max-sm:max-h-[90px] max-sm:translate-y-2 max-w-[141px] max-h-[150px] translate-y-4 "
        />
      </Link>
    </div>
  );
};

export default ProjectsBtn;
