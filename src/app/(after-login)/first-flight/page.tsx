'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { ImageUpload } from './_components/ImageUpload';

const FirstFlightPage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!imageUrl) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/image-openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputImage: imageUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const data = await response.json();
      // Handle the response data as needed
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto mt-20 max-w-xl p-6">
      <Card className="border-red-600 bg-black text-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            First Flight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-center text-gray-400">
            Upload an image to begin your first flight
          </p>
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            disabled={isSubmitting}
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={!imageUrl || isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {isSubmitting ? 'Processing...' : 'Submit Image'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FirstFlightPage;
