import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@/components/ui/use-toast';
import { useImageStore } from '@/store/use-first-flight-store';

interface ProcessImageResponse {
  result: string;
  goStraight: boolean;
  imageUrl?: string;
  similarityPercentage?: number;
  pixelSimilarityPercentage?: number;
  updatedScore?: number;
}

export function useProcessImage() {
  const {
    setImageUrl,
    setResult,
    setGoStraight,
    setProcessing,
    setError,
    setSimilarityPercentage,
    setPixelSimilarityPercentage,
    setUpdatedScore,
  } = useImageStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData): Promise<ProcessImageResponse> => {
      setProcessing(true);

      const fetchWithRetry = async (
        retries = 3
      ): Promise<ProcessImageResponse> => {
        try {
          const response = await fetch('/api/first-flight', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to process image');
          }

          return response.json();
        } catch (error) {
          if (
            retries > 0 &&
            error instanceof Error &&
            (error.message.includes('Unexpected token') ||
              error.message.includes('JSON') ||
              error.message.includes('json') ||
              error.message.includes('Please try again'))
          ) {
            console.log(
              `Retrying after unexpected token error. Attempts remaining: ${retries - 1}`
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return fetchWithRetry(retries - 1);
          }
          throw error;
        }
      };

      return fetchWithRetry();
    },
    onSuccess: (data) => {
      setResult(data.result);
      setGoStraight(data.goStraight);
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
      if (data.similarityPercentage !== undefined) {
        setSimilarityPercentage(data.similarityPercentage);
      }
      if (data.pixelSimilarityPercentage !== undefined) {
        setPixelSimilarityPercentage(data.pixelSimilarityPercentage);
      }
      if (data.updatedScore !== undefined) {
        setUpdatedScore(data.updatedScore);
      }

      queryClient.invalidateQueries({ queryKey: ['userFirstRed'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });

      toast({
        title: 'Success',
        description: 'Image processed successfully',
      });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
      setError(error);

      toast({
        title: 'Error',
        description:
          error.message || 'An error occurred while processing your image.',
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setProcessing(false);
    },
  });
}
