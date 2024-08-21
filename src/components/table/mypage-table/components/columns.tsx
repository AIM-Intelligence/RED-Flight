"use client";

import { targets } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/Checkbox";
import { Database } from "@/validation/types/supabase";

type PromptNFT = Database["public"]["Tables"]["prompt nft"]["Row"];

export const columns: ColumnDef<PromptNFT>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] border-red-500"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] border-red-500"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      const truncatedId = id.slice(0, 7);
      return (
        <div className="w-[80px]" title={id}>
          {truncatedId}...
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
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

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
