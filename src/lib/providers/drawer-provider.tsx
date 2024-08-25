"use client";

import { useEffect, useState } from "react";

import { NFTClaimDrawer } from "@/components/drawer/NFTClaimdrawer";

export const DrawerProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NFTClaimDrawer />
    </>
  );
};
