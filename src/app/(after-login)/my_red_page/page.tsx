'use client';

import { useQuery } from '@tanstack/react-query';

import PromptPageTable from '@/components/table/mypage-table/prompt-table/page';
import Error from '@/app/error';
import Loading from '@/app/loading';
import { useGetMyFirstRed } from '@/hooks/prompt/useGetMyFirstRed';
import { getOrCreateWeb3User } from '@/server/auth/sign-in';
import UserInfo from './_components/UserInfo';

const ClientPage = () => {
  // Get user's first red prompts
  const {
    data: promptData,
    isLoading: promptLoading,
    error: promptError,
  } = useGetMyFirstRed();

  // 서버에서 prefetch된 데이터 사용
  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['userData'],
    queryFn: getOrCreateWeb3User,
  });

  if (isLoading || promptLoading) return <Loading />;
  if (error || promptError)
    return (
      <Error
        message={
          error instanceof Error
            ? error.message
            : promptError instanceof Error
              ? promptError.message
              : 'Error has occurred'
        }
      />
    );

  console.log('promptData', promptData);

  // Extract prompts and status from the prompt data
  const prompts = promptData || [];

  return (
    <div className="custom-scrollbar mx-auto flex h-screen w-screen flex-col justify-start gap-8 overflow-y-auto">
      <div className="mx-auto mt-[150px] w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        {userData && <UserInfo user={userData} />}
      </div>
      <div className="mx-auto mb-20 w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        {promptLoading ? (
          <div className="flex items-center justify-between space-y-2 p-8">
            <h2 className="text-3xl font-bold tracking-tight text-red-600">
              Loading...
            </h2>
          </div>
        ) : promptError ? (
          <div className="flex items-center justify-between space-y-2 p-8">
            <h2 className="text-3xl font-bold tracking-tight text-red-600">
              Error
            </h2>
          </div>
        ) : (
          <PromptPageTable prompts={prompts} />
        )}
      </div>
    </div>
  );
};

export default ClientPage;
