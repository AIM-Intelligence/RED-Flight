"use client";

import { useEffect, useState } from "react";

import NFTDetail from "@/components/dialog/NftDetail";
import UserInfoEdit from "@/components/dialog/UserInfoEdit";
import UserInfoEditImage from "@/components/dialog/UserInfoEditImage";

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
      <NFTDetail />
      <UserInfoEdit />
      <UserInfoEditImage />
    </>
  );
};
