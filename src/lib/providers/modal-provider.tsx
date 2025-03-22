'use client';

import { useEffect, useState } from 'react';

import ImageZoomModal from '@/components/modal/ImageZoomModal';
import InputFormatModal from '@/components/modal/InputFormatModal';
import UserInfoEditModal from '@/components/modal/UserInfoEdit';

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
      <ImageZoomModal />
      <InputFormatModal />
    </>
  );
};
