import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@/components/ui/use-toast';
import { getOrCreateWeb3User } from '@/server/auth/sign-in';
import { Tables } from '@/validation/types/supabase';

type User = Tables<'user'>;

export function useWeb3User() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: getOrCreateWeb3User,
    onSuccess: (_: User) => {
      queryClient.invalidateQueries({ queryKey: ['userPrompts'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update user data',
        variant: 'destructive',
      });
    },
  });

  const refreshUser = useCallback(async (): Promise<void> => {
    await mutation.mutateAsync();
  }, [mutation]);

  return {
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    refreshUser,
  };
}
