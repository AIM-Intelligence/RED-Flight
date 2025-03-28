'use client';

import { Database } from '@/validation/types/supabase';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

type PromptNFT = Database['public']['Tables']['first-red']['Row'];

interface PromptPageTableProps {
  prompts: PromptNFT[];
}

export default function PromptPageTable({ prompts }: PromptPageTableProps) {
  return (
    <div className="flex h-full flex-1 flex-col space-y-4 p-4 md:space-y-8 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-red-600 md:text-2xl">
          My Red Prompts
        </h2>
      </div>
      <DataTable data={prompts} columns={columns} />
    </div>
  );
}
