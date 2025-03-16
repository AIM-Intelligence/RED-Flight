'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  disabled?: boolean;
  className?: string;
}

export const ImageUpload = ({
  onChange,
  value,
  disabled,
  className,
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = ['image/jpeg', 'image/png', 'image/webp'];

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 파일 형식 검사
    if (!supportedFormats.includes(file.type)) {
      setError(
        'This file format is not supported. Only JPG, PNG, WEBP are allowed.'
      );
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const data = await response.json();
      onChange(data.url);
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
    onChange('');
  };

  return (
    <Card className={cn('border-red-600 bg-black', className)}>
      <CardContent className="p-0">
        <div
          onClick={!disabled && !isUploading ? handleClick : undefined}
          className={cn(
            'relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-red-500 bg-black/50 p-4 text-white transition hover:opacity-75',
            disabled && 'cursor-not-allowed opacity-50 hover:opacity-50'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/png, image/gif, image/webp"
            onChange={handleUpload}
            disabled={disabled || isUploading}
            className="hidden"
          />

          {value ? (
            <div className="relative h-full w-full">
              <Image
                src={value}
                alt="Uploaded image"
                fill
                className="rounded-md object-cover"
              />
              <Button
                onClick={handleRemove}
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/70 p-0 hover:bg-black"
                disabled={disabled || isUploading}
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
                  : 'Drag & drop or click to upload'}
              </p>
              <p className="text-xs text-gray-400">Max file size: 10MB</p>
              <p className="text-xs text-gray-400">
                Supported formats: JPG, PNG, GIF, WEBP
              </p>
              {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
