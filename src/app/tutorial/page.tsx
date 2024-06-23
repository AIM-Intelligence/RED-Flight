"use client";

import React from "react";
import First from "@/components/tutorial_page/01";
import Second from "@/components/tutorial_page/02";
import { useCount } from "@/store/tutorial_store";
import ThirdFourth from "@/components/tutorial_page/03-04";
import Fifth from "@/components/tutorial_page/05";
import Sixth from "@/components/tutorial_page/06";
import Seventh from "@/components/tutorial_page/07";

import { MessagesProvider } from "@/context/messages";
import Eighth from "@/components/tutorial_page/08";
const Page = () => {
  const { count } = useCount();

  return (
    <div className="relative w-full h-screen">
      {count === 1 && <First />}
      {count === 2 && <Second />}
      {count === 3 && <ThirdFourth />}
      {count === 4 && <Fifth />}
      {count === 5 && <Sixth />}
      <MessagesProvider>
        {count === 6 && <Seventh />}
        {count === 7 && <Eighth />}
      </MessagesProvider>
    </div>
  );
};

export default Page;
