'use server';

import { createSupabaseServer } from '@/lib/supabase/createSupabaseAdmin';
import { Database } from '@/validation/types/supabase';

type FirstRed = Database['public']['Tables']['first-red']['Row'];
type User = Database['public']['Tables']['user']['Row'];

export type ImageRankWithUser = Pick<
  FirstRed,
  'id' | 'created_at' | 'response' | 'result' | 'pixel_similarity'
> & {
  user: Pick<User, 'name' | 'image_url'> | null;
};

export async function getTopImagesByPixelSimilarity(
  limit = 50
): Promise<ImageRankWithUser[]> {
  const supabase = createSupabaseServer();

  const { data, error } = await supabase
    .from('first-red')
    .select(
      `
      id,
      created_at,
      response,
      result,
      pixel_similarity,
      user:creator (
        name,
        image_url
      )
    `
    )
    .not('pixel_similarity', 'is', null)
    .order('pixel_similarity', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching top images by pixel similarity:', error);
    throw new Error('Failed to fetch top images');
  }

  // const transformedData = data.map(item => ({
  //   ...item,
  //   user: item.user[0] || null,
  // }));

  return data as any;
}
