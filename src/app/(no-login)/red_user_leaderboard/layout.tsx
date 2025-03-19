import Image from 'next/image';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getUserRank } from '@/server/user-rank/select-userRank';
import getQueryClient from '@/utils/getQueryClient';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['userRanks'],
      queryFn: getUserRank,
    });
  } catch (error) {
    console.error('Error prefetching user rank data:', error);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="relative min-h-screen bg-black text-white">
      <Image
        src="/background/02.png"
        alt="Background"
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className="relative z-10">
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>
      </div>
    </main>
  );
};

export default layout;
