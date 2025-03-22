import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@/components/ui/use-toast';
import { getOrCreateWeb3User } from '@/server/auth/sign-in';
import { Tables } from '@/validation/types/supabase';

type User = Tables<'user'>;

export function useGetOrCreateWeb3User() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: getOrCreateWeb3User,
    onSuccess: (user: User) => {
      // Invalidate any queries that might be affected by the user creation/update

      queryClient.invalidateQueries({ queryKey: ['userFirstRed'] });

      // toast({
      //   title: 'Success',
      //   description: 'User profile synced successfully',
      // });

      return user;
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to sync user profile',
        variant: 'destructive',
      });
    },
  });

  const syncUserProfile = useCallback(async (): Promise<User | undefined> => {
    try {
      return await mutation.mutateAsync();
    } catch (error) {
      console.error('Error syncing user profile:', error);
      return undefined;
    }
  }, [mutation]);

  return {
    syncUserProfile,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    user: mutation.data,
  };
}
