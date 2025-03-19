'use client';

import { Database } from '@/validation/types/supabase';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

type PromptNFT = Database['public']['Tables']['red prompt nft']['Row'];

interface NFTPageTableProps {
  promptsWithChainId: PromptNFT[];
  status: any;
}

export default function NFTTable({
  promptsWithChainId,
  status,
}: NFTPageTableProps) {
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
            My Red NFTs
          </h2>
        </div>
        <DataTable data={promptsWithChainId} columns={columns} />
      </div>
    </>
  );
}
