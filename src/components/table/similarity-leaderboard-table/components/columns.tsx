'use client';

import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';

import { ImageRankWithUser } from '@/server/rank/select-imageRank';
// import { MediaRenderer } from 'thirdweb/react';

// import { client } from '@/lib/supabase/client';

import { DataTableColumnHeader } from './data-table-column-header';

export const columns: ColumnDef<ImageRankWithUser>[] = [
  // rank
  {
    accessorKey: 'rank',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rank" />
    ),
    cell: ({ row }) => {
      // Get displayRank property that will be set in the parent component
      const displayRank = (row.original as any).displayRank || row.index + 1;

      return (
        <span className="max-w-[100px] truncate text-xl font-bold">
          {displayRank}
        </span>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // user profile
  {
    accessorKey: 'user.image_url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profile" />
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.user?.image_url;

      return (
        <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full bg-black">
          {imageUrl ? (
            <Image
              width={130}
              height={130}
              src={imageUrl}
              alt="profile image"
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              width={130}
              height={130}
              src="/asset/1.png"
              alt="default profile"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // creator name
  {
    accessorKey: 'user.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creator" />
    ),
    cell: ({ row }) => {
      const name = row.original.user?.name;

      return (
        <span className="max-w-[500px] truncate font-medium">
          {name || 'Unknown'}
        </span>
      );
    },
    filterFn: (row, value) => {
      const name = row.original.user?.name || 'Unknown';
      return name.toLowerCase().includes(value.toLowerCase());
    },
    enableSorting: false,
    enableHiding: false,
  },
  // explanation
  {
    accessorKey: 'response',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Explanation" />
    ),
    cell: ({ row }) => {
      const explanation = JSON.parse(row.original.response).explanation;
      return (
        <span className="max-w-[500px] truncate font-medium">
          {explanation?.substring(0, 50)}...
        </span>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // pixel similarity
  {
    accessorKey: 'pixel_similarity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Similarity %" />
    ),
    cell: ({ row }) => {
      const similarity = row.original.pixel_similarity;
      const formattedSimilarity = similarity
        ? `${similarity.toFixed(4)}%`
        : 'N/A';

      return (
        <span className="max-w-[500px] truncate font-medium">
          {formattedSimilarity}
        </span>
      );
    },
    sortingFn: 'basic',
    sortDescFirst: true,
  },
];
