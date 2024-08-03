"use client";
import { client } from "@/lib/client";

import { ConnectButton, useActiveAccount } from "thirdweb/react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import MagicButton from "../ui/MagicButton";
import { Bot } from "lucide-react";
import { AIGenerate } from "../NFT/ImageGenerator";
import { useState } from "react";

const GetToken = () => {
  const activeAccount = useActiveAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [isUsed, setIsUsed] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setIsUsed(true);
  };

  if (!activeAccount?.address) {
    return (
      <ConnectButton
        appMetadata={{
          name: "RED Flight",
          url: "https://www.redflight.io",
        }}
        client={client}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <MagicButton
          title={isUsed ? "Mint Complete" : "Mint Prompt NFT"}
          icon={<Bot />}
          position="right"
          disabled={isUsed}
        />
      </DialogTrigger>
      <DialogContent>
        <AIGenerate onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default GetToken;
