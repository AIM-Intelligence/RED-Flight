'use server';

import { createSupabaseServer } from '@/lib/supabase/createSupabaseAdmin';
import { Database } from '@/validation/types/supabase';

type User = Database['public']['Tables']['user']['Row'];

export async function getUserRank(): Promise<User[]> {
  const supabase = createSupabaseServer();

  const { data, error } = await supabase
    .from('user')
    .select('*')
    .order('score', { ascending: false });

  if (error) {
    console.error('Error fetching user ranks:', error);
    throw new Error('Failed to fetch user rankings');
  }

  return data as User[];
}
