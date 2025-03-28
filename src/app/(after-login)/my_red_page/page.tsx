'use client';

import { useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';

import PromptPageTable from '@/components/table/mypage-table/prompt-table';
import Loading from '@/app/loading';
import { useGetMyFirstRed } from '@/hooks/my-prompt/useGetMyFirstRed';
import { useGetUser } from '@/hooks/user/useGetUser';
import { logout } from '@/server/auth/auth';
import UserInfo from './_components/UserInfo';

const ClientPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Get user's first-red prompts
  const {
    data: promptData,
    isLoading: promptLoading,
    error: promptError,
  } = useGetMyFirstRed();

  // Use the new useGetUser hook
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUser();

  const handleError = useCallback(async () => {
    await logout();
    window.location.href = '/auth';
  }, []);

  if (userLoading || promptLoading) return <Loading />;
  if (userError || promptError) {
    // Call the error handler
    handleError();
  }

  // Extract prompts and status from the prompt data
  const prompts = promptData || [];

  return (
    <div className="custom-scrollbar mx-auto flex h-screen w-screen flex-col justify-start gap-4 overflow-y-auto px-4 pb-20 md:gap-8">
      <div
        className={`mx-auto ${isMobile ? 'mt-[100px]' : 'mt-[150px]'} w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60`}
      >
        {userData && <UserInfo user={userData} />}
      </div>
      <div className="mx-auto w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        <PromptPageTable prompts={prompts} />
      </div>
    </div>
  );
};

export default ClientPage;
