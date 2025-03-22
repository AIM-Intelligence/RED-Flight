import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@/components/ui/use-toast';
import { useImageStore } from '@/store/use-first-flight-store';

interface ProcessImageResponse {
  result: string;
  goStraight: boolean;
  imageUrl?: string;
  similarityPercentage?: number;
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
    setUpdatedScore,
  } = useImageStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData): Promise<ProcessImageResponse> => {
      setProcessing(true);
      const response = await fetch('/api/first-flight', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process image');
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log('Response:', data);
      setResult(data.result);
      setGoStraight(data.goStraight);
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
      if (data.similarityPercentage !== undefined) {
        setSimilarityPercentage(data.similarityPercentage);
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
