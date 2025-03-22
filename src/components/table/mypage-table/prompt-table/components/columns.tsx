'use client';

//import { DataTableRowActions } from "./data-table-row-actions";
import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';

import { formatDateToLocal } from '@/utils/date-to-local';
//import { Checkbox } from "@/components/ui/Checkbox";
import { Database } from '@/validation/types/supabase';
import { DataTableColumnHeader } from './data-table-column-header';

type PromptNFT = Database['public']['Tables']['first-red']['Row'];

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
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const imageUrl = row.getValue('image_url') as string;

      if (!imageUrl) {
        return null;
      }

      return (
        <div className="h-16 w-16 overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt="Prompt image"
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'response',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Explanation" />
    ),
    cell: ({ row }) => {
      const response = row.getValue('response') as string;

      if (!response) {
        return null;
      }

      // Parse the JSON response and extract explanation
      try {
        const parsedResponse = JSON.parse(response);
        const explanation =
          parsedResponse.explanation || 'No explanation provided';

        return (
          <div className="max-w-[300px] truncate">
            <span>{explanation}</span>
          </div>
        );
      } catch (_error) {
        return (
          <div className="max-w-[300px] truncate">
            <span>{response}</span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: 'similarity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Similarity (%)" />
    ),
    cell: ({ row }) => {
      const similarity = row.getValue('similarity') as number;

      return (
        <div className="w-[100px]">
          <span className="font-medium">{similarity?.toFixed(2) || 'N/A'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'result',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const result = row.getValue('result') as boolean;

      return (
        <div className="flex w-[100px] items-center">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              result ? 'bg-green-100 text-green-800' : 'bg-white text-red-700'
            }`}
          >
            {result ? 'Success' : 'Failed'}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
