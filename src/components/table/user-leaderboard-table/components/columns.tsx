'use client';

import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { MediaRenderer } from 'thirdweb/react';

import { client } from '@/lib/client';
import { Database } from '@/validation/types/supabase';
import { DataTableColumnHeader } from './data-table-column-header';

type User = Database['public']['Tables']['user']['Row'];

export const columns: ColumnDef<User>[] = [
  // rank
  {
    accessorKey: 'rank',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rank" />
    ),
    cell: ({ row }) => {
      const rank = row.index + 4;
      return (
        <span className="max-w-[100px] truncate text-xl font-bold">{rank}</span>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // profile
  {
    accessorKey: 'image_url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profile" />
    ),
    cell: ({ row }) => {
      const url = row.getValue('image_url') as string;
      if (!url) {
        return (
          <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full bg-black">
            <Image
              width={130}
              height={130}
              src="/asset/1.png"
              alt="default profile"
            />
          </div>
        );
      }
      return (
        <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-sm bg-black">
          <MediaRenderer client={client} src={url} className="rounded-full" />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // name
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      if (name) {
        return (
          <span className="max-w-[500px] truncate font-medium">{name}</span>
        );
      } else {
        return (
          <span className="max-w-[500px] truncate font-medium text-[#c4c4c4]">
            Unknown
          </span>
        );
      }
    },
    filterFn: (row, id, value) => {
      const name = (row.getValue(id) as string) ?? '';
      const filterValue = value.toLowerCase();
      return name.toLowerCase().includes(filterValue);
    },
    enableSorting: false,
    enableHiding: false,
  },
  // address
  {
    accessorKey: 'wallet_address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      const address = row.getValue('wallet_address') as string;
      const truncated = address.slice(0, 7);
      return (
        <span className="max-w-[500px] truncate font-medium">
          {truncated}...
        </span>
      );
    },
    filterFn: (row, id, value) => {
      const address = (row.getValue(id) as string) ?? '';
      const filterValue = value.toLowerCase();
      return address.toLowerCase().includes(filterValue);
    },
    enableSorting: false,
    enableHiding: false,
  },
  // score
  {
    accessorKey: 'score',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue('score')}
        </span>
      );
    },
  },
];
