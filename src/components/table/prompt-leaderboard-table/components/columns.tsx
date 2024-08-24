"use client";

import { targets } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/Checkbox";
import { Database } from "@/validation/types/supabase";

type PromptNFT = Omit<
  Database["public"]["Tables"]["prompt nft"]["Row"],
  "prompt"
>;

type User = {
  name: string;
};

export const columns: ColumnDef<PromptNFT>[] = [
  // checkbox
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px] border-red-500"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={value => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px] border-red-500"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  // image_url
  {
    accessorKey: "image_url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const url = row.getValue("image_url") as string;
      if (!url) {
        return (
          <div
            className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-sm bg-black p-1"
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
  // creator name
  {
    accessorKey: "user",
    id: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creator Name" />
    ),
    cell: ({ row }) => {
      const user = row.getValue("user") as User;
      if (!user.name) {
        return (
          <span className="max-w-[500px] truncate font-medium">NoName</span>
        );
      } else {
        return (
          <span className="max-w-[500px] truncate font-medium">
            {user.name}
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
    id: "creator",
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
  // target
  {
    accessorKey: "target",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target" />
    ),
    cell: ({ row }) => {
      const target = targets.find(
        target => target.value === row.getValue("target"),
      );

      if (!target) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{target.label}</span>
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
      const level = row.getValue("level") as number;
      let levelLabel: string;

      switch (level) {
        case 1:
          levelLabel = "Easy";
          break;
        case 2:
          levelLabel = "Normal";
          break;
        case 3:
          levelLabel = "Hard";
          break;
        case 4:
          levelLabel = "Extreme";
          break;
        case 5:
          levelLabel = "Custom";
          break;
        default:
          levelLabel = "Unknown";
      }

      return (
        <div className="flex items-center">
          <span>{levelLabel}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const levelMap = {
        1: "easy",
        2: "normal",
        3: "hard",
        4: "extreme",
        5: "custom",
      };
      const levelValue =
        levelMap[row.getValue(id) as keyof typeof levelMap] || "unknown";
      return value.includes(levelValue);
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
        <span className="max-w-[500px] truncate font-medium">
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
      const chain_id = row.getValue("chain_id") as number;
      let chainIdLabel: string;

      switch (chain_id) {
        case 7001:
          chainIdLabel = `Zeta ${chain_id}`;
          break;
        case 3441006:
          chainIdLabel = `Manta ${chain_id}`;
          break;
        case 300:
          chainIdLabel = `ZKsync ${chain_id}`;
          break;
        case 1115:
          chainIdLabel = `Core ${chain_id}`;
          break;
        case 365:
          chainIdLabel = `Theta ${chain_id}`;
          break;
        default:
          chainIdLabel = "Unknown";
      }

      return (
        <div className="flex items-center">
          <span>{chainIdLabel}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const chainIdMap = {
        7001: "zeta",
        3441006: "manta",
        300: "zksync",
        1115: "core",
        365: "theta",
      };
      const chainIdValue =
        chainIdMap[row.getValue(id) as keyof typeof chainIdMap] || "unknown";
      return value.includes(chainIdValue);
    },
    enableSorting: false,
  },

  // details
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
