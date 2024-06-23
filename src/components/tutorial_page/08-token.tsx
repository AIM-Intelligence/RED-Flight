"use client";
import { client } from "@/lib/client";

import { ConnectButton, useActiveAccount } from "thirdweb/react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MagicButton from "../ui/magic-button";
import { Bot } from "lucide-react";
import { AIGenerate } from "../NFT/ImageGenerator";

const GetToken = () => {
  const activeAccount = useActiveAccount();

  if (!activeAccount?.address) {
    return (
      <ConnectButton
        appMetadata={{
          name: "RED Flight",
          url: "https://red-flight.vercel.app",
        }}
        client={client}
      />
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <MagicButton title="Mint Prompt NFT" icon={<Bot />} position="right" />
      </DialogTrigger>
      <DialogContent>
        <AIGenerate />
      </DialogContent>
    </Dialog>
  );
};

export default GetToken;
