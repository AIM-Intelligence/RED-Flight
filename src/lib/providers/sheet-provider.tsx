'use client';

import { useEffect, useState } from 'react';

import PromptDetailSheet from '@/components/sheet/PromptDetailSheet';

export const SheetProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PromptDetailSheet />
    </>
  );
};
