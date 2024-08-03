"use client";

import NFTDetail from "@/components/dialog/NftDetail";
import UserInfoEdit from "@/components/dialog/UserInfoEdit";
import UserInfoEditImage from "@/components/dialog/UserInfoEditImage";
import { useEffect, useState } from "react";

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
