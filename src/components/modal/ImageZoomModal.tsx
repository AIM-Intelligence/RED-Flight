'use client';

import React from 'react';
import Image from 'next/image';
import { ZoomOut } from 'lucide-react';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { useModal } from '@/store/use-modal-store';

const ImageZoomModal: React.FC = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === 'showImageZoom';
  const imageUrl = data?.imageUrl;

  if (!isModalOpen || !imageUrl) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl border-red-600 bg-black p-4 text-white">
        <div className="relative flex h-[80vh] w-full items-center justify-center">
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt="Zoomed image"
              fill
              className="object-contain"
              priority
            />
          </div>
          <button
            onClick={onClose}
            className="absolute bottom-4 right-4 rounded-full bg-black/70 p-3 text-white transition hover:bg-black/90"
            aria-label="Close zoom view"
          >
            <ZoomOut className="h-6 w-6" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageZoomModal;
