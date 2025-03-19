'use client';

import { Database } from '@/validation/types/supabase';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

type PromptNFT = Database['public']['Tables']['first red']['Row'];

interface PromptPageTableProps {
  prompts: PromptNFT[];
}

export default function PromptPageTable({ prompts }: PromptPageTableProps) {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-red-600">
            My Red Prompts
          </h2>
        </div>
        <DataTable data={prompts} columns={columns} />
      </div>
    </>
  );
}
