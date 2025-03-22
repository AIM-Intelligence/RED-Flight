'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { useProcessImage } from '@/hooks/first-flight/useProcessImage';
import { useImageStore } from '@/store/use-first-flight-store';

export const ImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the store instead of local state for imageUrl
  const {
    imageUrl,
    setImageUrl,
    isProcessing,
    error: processingError,
    setError: setProcessingError,
  } = useImageStore();
  const mutation = useProcessImage();

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

  const processFile = (file: File) => {
    // File format validation
    if (!supportedFormats.includes(file.type)) {
      setError(
        'This file format is not supported. Only JPG, PNG, WEBP are allowed.'
      );
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  // Modify handleFileSelect to use the processFile function
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (isUploading || isProcessing || imageUrl || previewUrl) return;

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);
    setProcessingError(null); // Reset processing error when uploading

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Just call processImage - store update is handled inside the hook
      await mutation.mutateAsync(formData);
      setSelectedFile(null); // Clear selected file after successful upload
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImageUrl(null); // Update the store
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null); // Reset local error state
    setProcessingError(null); // Reset store error state
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Combine both errors for display
  const displayError =
    error || (processingError ? processingError.message : null);

  return (
    <Card className="border-none bg-black/40">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          {/* Image Preview or Upload Area */}
          <div
            onClick={
              !isUploading && !isProcessing && !imageUrl && !previewUrl
                ? handleClick
                : undefined
            }
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              'relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-red-500 bg-black/50 p-4 text-white transition hover:opacity-75',
              (isUploading || isProcessing || imageUrl || previewUrl) &&
                'cursor-default hover:opacity-100',
              isDragging && 'border-white bg-black/70'
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleFileSelect}
              disabled={isUploading || isProcessing}
              className="hidden"
            />

            {imageUrl ? (
              <div className="relative h-full w-full">
                <Image
                  src={imageUrl}
                  alt="Uploaded image"
                  fill
                  className="rounded-md object-cover"
                />
                <Button
                  onClick={handleRemove}
                  className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/70 p-0 hover:bg-black"
                  disabled={isUploading || isProcessing}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <p className="text-white">Processing image...</p>
                  </div>
                )}
              </div>
            ) : previewUrl ? (
              <div className="relative h-full w-full">
                <Image
                  src={previewUrl}
                  alt="Selected image preview"
                  fill
                  className="rounded-md object-cover"
                />
                <Button
                  onClick={handleRemove}
                  className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/70 p-0 hover:bg-black"
                  disabled={isUploading || isProcessing}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <Upload className="h-10 w-10 text-red-500" />
                <p className="text-sm font-medium">
                  {isUploading
                    ? 'Uploading...'
                    : isProcessing
                      ? 'Processing...'
                      : 'Drag & drop or click to upload'}
                </p>
                <p className="text-xs text-gray-400">Max file size: 3MB</p>
                <p className="text-xs text-gray-400">
                  Supported formats: JPG, PNG, WEBP
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            {!selectedFile && !imageUrl && (
              <div className="flex justify-center">
                <p className="text-center text-white">Upload an image first</p>
              </div>
            )}

            {selectedFile && !imageUrl && (
              <div className="flex justify-between gap-2">
                <div>
                  {displayError && (
                    <p className="text-sm text-red-500">{displayError}</p>
                  )}
                </div>
                <div className="flex w-full gap-2">
                  <Button
                    onClick={handleUpload}
                    className="flex-1 bg-red-600 text-white hover:bg-red-700"
                    disabled={isUploading || isProcessing}
                    type="button"
                  >
                    {isUploading ? 'Attack in progress...' : 'Attack'}
                  </Button>
                  <Button
                    onClick={handleRemove}
                    className="flex-1 bg-gray-700 text-white hover:bg-gray-800"
                    disabled={isUploading || isProcessing}
                    type="button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {imageUrl && (
              <div className="flex w-full justify-center">
                <Button
                  onClick={handleRemove}
                  className="w-full bg-red-600 text-white hover:bg-red-700"
                  disabled={isProcessing}
                  type="button"
                >
                  Restart
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
