"use client";

import First from "@/components/tutorial_page/01";
import Second from "@/components/tutorial_page/02";
import { useCount } from "@/store/tutorial_store";

const Page = () => {
  const { count } = useCount();

  return <div className="relative w-full h-screen">{count === 1 ? <First /> : <Second />}</div>;
};

export default Page;
