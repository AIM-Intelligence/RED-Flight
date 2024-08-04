"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { ConnectEmbed, useActiveWalletChain } from "thirdweb/react";

import { client } from "@/lib/client";

const page = () => {
  const chain = useActiveWalletChain();
  const router = useRouter();

  useEffect(() => {
    if (!chain) {
      router.push("/");
    }
  }, [chain]);

  return (
    <div className="flex h-full items-center justify-center">
      <ConnectEmbed client={client} modalSize="wide" />
    </div>
  );
};

export default page;
