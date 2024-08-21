"use client";

import { useEffect, useState } from "react";

import UserInfoEditModal from "@/components/modal/UserInfoEdit";
import RedPromptModal from "@/components/modal/dPromptModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UserInfoEditModal />
      <RedPromptModal />
    </>
  );
};
