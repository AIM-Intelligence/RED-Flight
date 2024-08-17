import React from "react";

import { useRouter } from "next/navigation";

interface ISectionList {
  title: string;
  description?: string;
  path: string;
  imgUrl: string;
  rowSpan?: string;
}

interface SectionProps {
  sectionDetail: ISectionList;
  setBackgroundImg: React.Dispatch<React.SetStateAction<string>>;
}

const Section: React.FC<SectionProps> = ({
  sectionDetail,
  setBackgroundImg,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(sectionDetail.path)}
      onMouseOver={() => setBackgroundImg(sectionDetail.imgUrl)}
      className={`group flex cursor-pointer flex-col items-center justify-center p-4 ${sectionDetail.rowSpan} bg-transparent transition-all duration-300 ease-in-out hover:bg-black hover:bg-opacity-50`}
    >
      <div className="text-3xl font-bold opacity-40 group-hover:opacity-100">
        {sectionDetail.title}
      </div>
      <div className="description opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        {sectionDetail.description}
      </div>
    </div>
  );
};

export default Section;
