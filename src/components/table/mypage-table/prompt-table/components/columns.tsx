'use client';

//import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from '@tanstack/react-table';

import { formatDateToLocal } from '@/utils/date-to-local';
//import { Checkbox } from "@/components/ui/Checkbox";
import { Database } from '@/validation/types/supabase';
import { DataTableColumnHeader } from './data-table-column-header';

type PromptNFT = Database['public']['Tables']['first red']['Row'];

export const columns: ColumnDef<PromptNFT>[] = [
  {
    id: 'rowNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.index + 1}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'image_url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image URL" />
    ),
    cell: ({ row }) => {
      const imageUrl = row.getValue('image_url') as string;

      if (!imageUrl) {
        return null;
      }

      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue('image_url')}
        </span>
      );
    },
  },
  {
    accessorKey: 'result',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Name" />
    ),
    cell: ({ row }) => {
      const result = row.getValue('result') as string;

      if (!result) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{result}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const dateValue = row.getValue('created_at') as string;
      const formattedDate = dateValue ? formatDateToLocal(dateValue) : '';

      return (
        <span className="max-w-[500px] truncate font-medium">
          {formattedDate}
        </span>
      );
    },
  },
];
