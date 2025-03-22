import { useQuery } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';
import { getUser } from '@/server/my-red/select-red-user'; // You'll need to create this function
import { Database } from '@/validation/types/supabase';

// Define the type that will be returned from the server function
type User = Database['public']['Tables']['user']['Row'];

export function useGetUser() {
  const { toast } = useToast();

  return useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        return await getUser();
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: 'An unknown error occurred',
            variant: 'destructive',
          });
        }
        throw error;
      }
    },
  });
}
