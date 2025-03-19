import { useMutation } from '@tanstack/react-query';

import { toast } from '@/components/ui/use-toast';
import { useImageStore } from '@/store/use-first-flight-store';

interface ProcessImageResponse {
  result: string;
  hasBird: boolean;
  imageUrl?: string;
}

export function useProcessImage() {
  const { setImageUrl, setResult, setHasBird, setProcessing, setError } =
    useImageStore();

  return useMutation({
    mutationFn: async (formData: FormData): Promise<ProcessImageResponse> => {
      setProcessing(true);
      const response = await fetch('/api/image-openai', {
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
      setHasBird(data.hasBird);
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }

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
