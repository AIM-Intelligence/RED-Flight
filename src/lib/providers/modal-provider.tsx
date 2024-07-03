"use client";

import NFTDetail from "@/components/dialog/nft_detail";
import UserInfoEdit from "@/components/dialog/user_info_edit";
import UserInfoEditImage from "@/components/dialog/user_info_edit_image";
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
