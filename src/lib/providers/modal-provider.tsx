"use client";

import { useEffect, useState } from "react";

import RedPromptModal from "@/components/modal/PromptModal";
import UserInfoEditModal from "@/components/modal/UserInfoEdit";

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
