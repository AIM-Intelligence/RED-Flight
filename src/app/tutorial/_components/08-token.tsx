"use client";

import { useState } from "react";

import { Bot } from "lucide-react";

import { AIGenerate } from "@/components/NFT/ImageGenerator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import MagicButton from "@/components/ui/MagicButton";

const GetToken = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUsed, setIsUsed] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setIsUsed(true);
  };

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
