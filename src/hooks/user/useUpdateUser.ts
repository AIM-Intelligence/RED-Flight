import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@/components/ui/use-toast';
import { Tables } from '@/validation/types/supabase';

type User = Tables<'user'>;

type UpdateUserParams = {
  name: string | null;
  description: string | null;
  email: string | null;
  imageUrl: string | null;
  imageBase64?: string | null;
  fileName?: string | null;
  mimeType?: string | null;
};

export function useUpdateWeb3User() {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (params: UpdateUserParams) => {
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user profile');
      }

      return response.json() as Promise<User>;
    },
    onMutate: async (updatedUserData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['user'] });

      // Snapshot the previous value
      const previousUserData = queryClient.getQueryData<User>(['user']);

      // Create a temporary URL for the image preview if we have a new image
      let tempImageUrl = updatedUserData.imageUrl;

      if (updatedUserData.imageBase64) {
        // For base64 data, we need to properly format it as a data URL
        tempImageUrl = updatedUserData.imageBase64.startsWith('data:')
          ? updatedUserData.imageBase64
          : `data:${updatedUserData.mimeType || 'image/jpeg'};base64,${updatedUserData.imageBase64}`;
      }

      // Optimistically update to the new value
      queryClient.setQueryData<User>(['user'], (old) => {
        if (!old) return old;
        return {
          ...old,
          name: updatedUserData.name ?? old.name,
          description: updatedUserData.description ?? old.description,
          email: updatedUserData.email ?? old.email,
          image_url: tempImageUrl ?? old.image_url,
        };
      });

      // Return a context object with the snapshotted value
      return { previousUserData };
    },
    onSuccess: () => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });

      toast({
        title: 'Success',
        description: 'User profile updated successfully',
      });
    },
    onError: (error: Error, _variables, context) => {
      // If there was an error, roll back to the snapshot
      if (context?.previousUserData) {
        queryClient.setQueryData(['user'], context.previousUserData);
      }

      toast({
        title: 'Error',
        description: error.message || 'Failed to update user profile',
        variant: 'destructive',
      });
    },
  });

  const updateUser = useCallback(
    async (params: UpdateUserParams): Promise<void> => {
      await updateMutation.mutateAsync(params);
    },
    [updateMutation]
  );

  return {
    updateUser,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}
