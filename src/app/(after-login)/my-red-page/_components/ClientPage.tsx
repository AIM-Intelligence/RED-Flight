'use client';

import { useEffect } from 'react';

import PromptPageTable from '@/components/table/mypage-tablew/prompt-table/page';
import { usePrompts, useSelectPrompt } from '@/hooks/prompt/useSelectPrompt';
import { useWeb3User } from '@/hooks/user/useSignIn';
import { useWeb3UserStore } from '@/store/user-store';
import UserInfo from './UserInfo';

const ClientPage = ({ initialUserData }: { initialUserData: any }) => {
  const { user, setUser } = useWeb3UserStore();
  const prompts = usePrompts();
  const { isLoading, refreshUser } = useWeb3User();
  const { status: promptStatus } = useSelectPrompt();

  // Use initialUserData to set the user in store
  useEffect(() => {
    if (initialUserData && !user) {
      setUser(initialUserData);
    } else if (!initialUserData && !user) {
      // If no initialUserData, try to fetch via client-side
      refreshUser();
    }
  }, [initialUserData, user, setUser, refreshUser]);

  console.log('user', user);

  return (
    <div className="custom-scrollbar mx-auto flex h-screen w-screen flex-col justify-start gap-8 overflow-y-auto">
      <div className="mx-auto mt-[150px] w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        <UserInfo
          user={user || initialUserData}
          isLoading={isLoading && !initialUserData}
        />
      </div>
      <div className="mx-auto mb-20 w-full max-w-7xl rounded-lg border border-red-600 bg-gray-800/60">
        <PromptPageTable prompts={prompts} status={promptStatus} />
      </div>
    </div>
  );
};

export default ClientPage;
