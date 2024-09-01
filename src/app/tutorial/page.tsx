"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import First from "./_components/01";
import Second from "./_components/02";
import ThirdFourth from "./_components/03-04";
import Fifth from "./_components/05";
import Sixth from "./_components/06";
import Seventh from "./_components/07";
import Eighth from "./_components/08";
import { useActiveAccount } from "thirdweb/react";

import { MessagesProvider } from "@/context/Messages";
import { useCount } from "@/store/tutorial-store";

const Page = () => {
  const router = useRouter();
  const activeAccount = useActiveAccount();
  const { count } = useCount();

  useEffect(() => {
    if (!activeAccount) {
      router.push("/");
    }
  }, [activeAccount, router, count]);

  return (
    <div className="relative h-screen w-full">
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
