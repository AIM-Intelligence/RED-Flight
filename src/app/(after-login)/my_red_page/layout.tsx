import Image from 'next/image';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getOrCreateWeb3User } from '@/server/auth/sign-in';
import getQueryClient from '@/utils/get-query-client';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  try {
    // 서버에서 데이터 미리 가져오기
    await queryClient.prefetchQuery({
      queryKey: ['userData'],
      queryFn: getOrCreateWeb3User,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

  // 쿼리 데이터 직렬화
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="relative min-h-screen bg-black text-white">
      <Image
        src="/background/05.png"
        alt="Background"
        fill
        style={{ objectFit: 'cover' }}
      />
      {/* Pass userData to children via a data attribute that can be accessed client-side */}
      <div className="relative z-10 pb-20">
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>
      </div>
    </main>
  );
};

export default layout;
