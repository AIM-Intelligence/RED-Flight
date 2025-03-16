'use client';

import { useAllPrompt, useAllPrompts } from '@/hooks/prompt/useAllPrompts';
import { useWeb3UserStore } from '@/store/user-store';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

export default function PromptLeaderBoardPageTable() {
  const prompts = useAllPrompts();
  const { user } = useWeb3UserStore();
  const { status } = useAllPrompt();
  console.log('all prompts', prompts);

  if (!user) {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Red Prompts Leaderboard
        </h2>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Loading...
        </h2>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Error
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-red-600">
            RED Prompt Leaderboard
          </h2>
        </div>
        <DataTable data={prompts} columns={columns} />
      </div>
    </>
  );
}
