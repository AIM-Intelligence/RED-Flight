"use client";

import Image from "next/image";

import { chainIds, levels } from "./criteria";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { MediaRenderer } from "thirdweb/react";

import { client } from "@/lib/client";
import { Database } from "@/validation/types/supabase";

type PromptNFT = Omit<
  Database["public"]["Tables"]["red prompt nft"]["Row"],
  "id" | "prompt"
>;

type User = {
  name: string;
};

export const columns: ColumnDef<PromptNFT>[] = [
  {
    accessorKey: "rank",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rank" />
    ),
    cell: ({ row }) => {
      const rank = row.index + 1;
      return (
        <span className="max-w-[100px] truncate text-xl font-bold">{rank}</span>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image_url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const url = row.getValue("image_url") as any;

      // console.log("wefewfwefewf", url);
      if (!url) {
        return (
          <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-sm bg-black">
            <Image
              width={130}
              height={130}
              src="/logo1.png"
              alt="default profile"
            />
          </div>
        );
      }
      return (
        <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-sm bg-black">
          <MediaRenderer
            client={client}
            src={url[0]}
            className="rounded-full"
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // creator name
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creator Name" />
    ),
    cell: ({ row }) => {
      const user = row.getValue("user") as User;

      if (user.name) {
        return (
          <span className="max-w-[500px] truncate font-medium">
            {user.name}
          </span>
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
      const user = row.getValue(id) as User;
      const name = user?.name?.toLowerCase() || "";
      const filterValue = value.toLowerCase();
      return name.includes(filterValue);
    },
    enableSorting: false,
    enableHiding: false,
  },
  // creator address
  {
    accessorKey: "creator",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creator Address" />
    ),
    cell: ({ row }) => {
      const creator = row.getValue("creator") as string;
      const truncated = creator.slice(0, 7);
      return (
        <span className="max-w-[500px] truncate font-medium">
          {truncated}...
        </span>
      );
    },
    filterFn: (row, id, value) => {
      const creator = row.getValue(id) as string;
      const filterValue = value.toLowerCase();
      return creator.toLowerCase().includes(filterValue);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Name" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;

      return (
        <div className="flex w-[100px] items-center">
          <span>{name ? name : "Nanobytes"}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // level
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Level" />
    ),
    cell: ({ row }) => {
      const level = levels.find(
        level => Number(level.value) === row.getValue("level"),
      );

      if (!level) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{level.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // conversation
  {
    accessorKey: "conversation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Conv" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("conversation")}
        </span>
      );
    },
  },
  // length
  {
    accessorKey: "length",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Length" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate text-lg font-bold font-medium text-white text-stroke">
          {row.getValue("length")}
        </span>
      );
    },
  },
  // chainID
  {
    accessorKey: "chain_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ChainID" />
    ),
    cell: ({ row }) => {
      const chainId = chainIds.find(
        chain => chain.value === row.getValue("chain_id"),
      );

      return (
        <div className="flex items-center">
          <span>{chainId?.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
];
