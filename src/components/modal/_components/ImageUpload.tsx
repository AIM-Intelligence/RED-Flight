'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  currentImageUrl: string | null;
  onImageChange: (file: File | null) => void;
}

export const ImageUpload = ({
  currentImageUrl,
  onImageChange,
}: ImageUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = ['image/jpeg', 'image/png', 'image/webp'];

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Create preview URL when a file is selected
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      // Free memory when this component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File format validation
    if (!supportedFormats.includes(file.type)) {
      setError(
        'This file format is not supported. Only JPG, PNG, WEBP are allowed.'
      );
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    setSelectedFile(file);
    onImageChange(file);
    setError(null);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedFile(null);
    setPreviewUrl(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Determine which image to show - preview of new file or current user image
  const displayImageUrl = previewUrl || currentImageUrl;

  return (
    <div className="mb-4">
      <div
        onClick={handleClick}
        className={cn(
          'relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-red-500 bg-slate-800 p-4 text-white transition hover:opacity-75'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        {displayImageUrl ? (
          <div className="relative h-full w-full">
            <Image
              src={displayImageUrl}
              alt="Profile image"
              fill
              className="rounded-md object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
              <div className="flex flex-col items-center space-y-2 px-4 text-center">
                <Upload className="h-8 w-8 text-white" />
                <p className="text-sm font-medium text-white">
                  Click to change image
                </p>
              </div>
            </div>
            {selectedFile && (
              <Button
                onClick={(e) => handleRemove(e)}
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/70 p-0 hover:bg-black"
                type="button"
                title="Remove image"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <Upload className="h-10 w-10 text-red-500" />
            <p className="text-sm font-medium">
              Drag & drop or click to upload profile image
            </p>
            <p className="text-xs text-gray-400">Max file size: 5MB</p>
            <p className="text-xs text-gray-400">
              Supported formats: JPG, PNG, WEBP
            </p>
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};
