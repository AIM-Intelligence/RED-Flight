'use client';

import Image from 'next/image';
import { ZoomIn } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet';
import { useModal } from '@/store/use-modal-store';
import { useSheet } from '@/store/use-sheet-store';
import { formatDateToLocal } from '@/utils/date-to-local';
import { Database } from '@/validation/types/supabase';

type PromptNFT = Database['public']['Tables']['first-red']['Row'];

const PromptDetailSheet = () => {
  const { isOpen, onClose, type, data } = useSheet();
  const openModal = useModal((state) => state.onOpen);
  const isSheetOpen = isOpen && type === 'showPromptDetail';
  const prompt = data?.prompt as PromptNFT | undefined;

  if (!isSheetOpen || !prompt) {
    return null;
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose}>
      <SheetContent className="border-red-600 bg-black text-white transition-opacity duration-300">
        <div className="mx-auto w-full max-w-md">
          <SheetHeader>
            <SheetTitle className="text-white">Prompt Details</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 p-2">
            {prompt.image_url && (
              <div className="flex justify-center">
                <div className="relative h-64 w-full max-w-lg overflow-hidden rounded-md">
                  <Image
                    src={prompt.image_url}
                    alt="Prompt image"
                    fill
                    className="object-contain"
                  />
                  <button
                    onClick={() =>
                      openModal('showImageZoom', { imageUrl: prompt.image_url })
                    }
                    className="absolute bottom-2 right-2 rounded-full bg-black/70 p-2 text-white transition hover:bg-black/90"
                    aria-label="Zoom image"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-3 text-sm">
              <div className="grid grid-cols-3 gap-2 border-b border-red-500/30 pb-2">
                <span className="font-semibold text-red-500">Result:</span>
                <span
                  className={`col-span-2 ${prompt.result ? 'text-green-500' : 'text-red-500'}`}
                >
                  {prompt.result ? 'Success' : 'Failed'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 border-b border-red-500/30 pb-2">
                <span className="font-semibold text-red-500">Similarity:</span>
                <span className="col-span-2">
                  {prompt.pixel_similarity?.toFixed(2) || 'N/A'}%
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 border-b border-red-500/30 pb-2">
                <span className="font-semibold text-red-500">Created At:</span>
                <span className="col-span-2">
                  {formatDateToLocal(prompt.created_at)}
                </span>
              </div>

              {/* Chat UI with custom scrolling */}
              <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold text-red-500">
                  Conversation
                </h3>
                <div className="custom-scrollbar max-h-[400px] overflow-y-auto rounded-md p-3">
                  {prompt.conversation && Array.isArray(prompt.conversation) ? (
                    <div className="space-y-3">
                      {prompt.conversation.map(
                        (message: any, index: number) => (
                          <div
                            key={index}
                            className={`rounded-lg p-3 ${
                              message.role === 'user'
                                ? 'ml-4 bg-slate-800'
                                : message.role === 'assistant'
                                  ? 'mr-4 bg-slate-700'
                                  : 'border border-red-500/30 bg-slate-900'
                            }`}
                          >
                            <div className="mb-1 text-xs font-medium text-red-400">
                              {message.role === 'user'
                                ? '👤 User'
                                : message.role === 'assistant'
                                  ? '🤖 AI'
                                  : '🤖 System'}
                            </div>
                            {typeof message.content === 'string' ? (
                              <p className="whitespace-pre-wrap text-sm">
                                {message.content}
                              </p>
                            ) : Array.isArray(message.content) ? (
                              <div className="space-y-2">
                                {message.content.map((item: any, i: number) => (
                                  <div key={i}>
                                    {item.type === 'text' && (
                                      <p className="whitespace-pre-wrap text-sm">
                                        {item.text}
                                      </p>
                                    )}
                                    {item.type === 'image_url' && (
                                      <div className="relative my-2 h-40 w-full overflow-hidden rounded-md">
                                        <Image
                                          src={item.image_url.url}
                                          alt="Message image"
                                          fill
                                          className="object-contain"
                                        />
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm italic text-gray-400">
                                Content contains non-text data
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-center italic text-gray-400">
                      No conversation data available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PromptDetailSheet;
