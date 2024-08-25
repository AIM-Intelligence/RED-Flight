"use client";

import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";

// import { Database } from "@/validation/types/supabase";

type User = {
  id: string;
  image_url: string;
  name: string;
  wallet_address: string;
  score: number;
  easy: number;
  normal: number;
  hard: number;
  extreme: number;
  rank: number;
};
// type User = Database["public"]["Tables"]["user"]["Row"]

export const columns: ColumnDef<User>[] = [
  // rank
  {
    accessorKey: "rank",
    id: "rank",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rank" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("rank")}
        </span>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // profile
  {
    accessorKey: "image_url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profile" />
    ),
    cell: ({ row }) => {
      const url = row.getValue("image_url") as string;
      if (!url) {
        return (
          <div
            className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full bg-black p-1"
            title={url}
          >
            <img className="w-full" src="/logo1.png" alt="default_img" />
          </div>
        );
      }
      return (
        <div
          className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-sm bg-black p-1"
          title={url}
        >
          <img className="w-full" src={url} alt="default_img" />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // name
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      if (!name) {
        return (
          <span className="max-w-[500px] truncate font-medium">NoName</span>
        );
      } else {
        return (
          <span className="max-w-[500px] truncate font-medium">{name}</span>
        );
      }
    },
    filterFn: (row, id, value) => {
      const name = row.getValue(id) as string;
      const filterValue = value.toLowerCase();
      return name.toLowerCase().includes(filterValue);
    },
    enableSorting: false,
    enableHiding: false,
  },
  // address
  {
    accessorKey: "wallet_address",
    id: "wallet_address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      const address = row.getValue("wallet_address") as string;
      const truncated = address.slice(0, 7);
      return (
        <span className="max-w-[500px] truncate font-medium">
          {truncated}...
        </span>
      );
    },
    filterFn: (row, id, value) => {
      const address = row.getValue(id) as string;
      const filterValue = value.toLowerCase();
      return address.toLowerCase().includes(filterValue);
    },
    enableSorting: false,
    enableHiding: false,
  },
  // score
  {
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("score")}
        </span>
      );
    },
  },
  // extreme
  {
    accessorKey: "extreme",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Extreme" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("extreme")}
        </span>
      );
    },
  },
  // hard
  {
    accessorKey: "hard",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hard" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("hard")}
        </span>
      );
    },
  },
  // normal
  {
    accessorKey: "normal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Normal" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("normal")}
        </span>
      );
    },
  },
  // easy
  {
    accessorKey: "easy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Easy" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("easy")}
        </span>
      );
    },
  },
];
