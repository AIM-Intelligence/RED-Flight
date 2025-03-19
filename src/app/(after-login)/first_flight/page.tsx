// src/app/(after-login)/first_flight/page.tsx
'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { useImageStore } from '@/store/use-first-flight-store';
import { ImageUpload } from './_components/ImageUpload';

const FirstFlightPage = () => {
  const { result, hasBird, isProcessing, imageUrl } = useImageStore();

  return (
    <div className="container z-20 mx-auto mt-20 grid max-w-5xl grid-cols-4 gap-4 p-6">
      <Card className="col-span-1 border-red-600 bg-black/40 text-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Image Jailbreaking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-center text-gray-400">
            Upload an image to begin your first flight
          </p>
        </CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>

      <Card className="col-span-3 border-red-600 bg-black/40 text-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Moving Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isProcessing ? (
            <div className="mb-4 rounded-md bg-black/50 p-4">
              <p className="text-center text-white">Processing your image...</p>
            </div>
          ) : imageUrl && result ? (
            <div className="mb-4 rounded-md bg-black/50 p-4">
              <h3 className="mb-2 text-xl font-bold">AI Analysis</h3>
              <p className="mb-2 text-gray-300">{result}</p>
              {hasBird !== undefined && (
                <p className="text-lg font-semibold">
                  {hasBird
                    ? '✅ Bird detected in the image'
                    : '❌ No bird detected in the image'}
                </p>
              )}
            </div>
          ) : (
            <p className="mb-4 text-center text-gray-400">
              Upload an image to begin your first flight
            </p>
          )}
          <ImageUpload />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default FirstFlightPage;
