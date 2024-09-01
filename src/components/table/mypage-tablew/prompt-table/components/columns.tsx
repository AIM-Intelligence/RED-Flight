"use client";

import { DataTableColumnHeader } from "./data-table-column-header";
//import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";

import { formatDateToLocal } from "@/utils/date-to-local";
//import { Checkbox } from "@/components/ui/Checkbox";
import { Database } from "@/validation/types/supabase";

type PromptNFT = Database["public"]["Tables"]["red prompt nft"]["Row"];

export const columns: ColumnDef<PromptNFT>[] = [
  {
    id: "rowNumber",
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Name" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;

      if (!name) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{name}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const name = (row.getValue(id) as string) ?? "";
      const filterValue = value.toLowerCase();
      return name.toLowerCase().includes(filterValue);
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
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const dateValue = row.getValue("created_at") as string;
      const formattedDate = dateValue ? formatDateToLocal(dateValue) : "";

      return (
        <span className="max-w-[500px] truncate font-medium">
          {formattedDate}
        </span>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const nft_address = row.getValue("nft_address") as string;
  //     const owner = row.getValue("owner") as string;

  //     if (nft_address && owner) {
  //       // mint & transfer
  //       return (
  //         <div className="flex inline-flex h-[28px] max-w-[500px] select-none items-center justify-center rounded-md border border-transparent bg-[rgba(240,185,11,0.2)] px-2 text-xs">
  //           <div className="mr-2 h-[6px] w-[6px] truncate rounded-md bg-[rgba(240,185,11,1)] font-medium"></div>
  //           After Sale
  //         </div>
  //       );
  //     } else if (nft_address && !owner) {
  //       // mint
  //       return (
  //         <div className="flex inline-flex h-[28px] max-w-[500px] select-none items-center justify-center rounded-md border border-transparent bg-[rgba(2,192,118,0.2)] px-2 text-xs">
  //           <div className="mr-2 h-[6px] w-[6px] truncate rounded-md bg-[rgba(2,192,118,1)] font-medium"></div>
  //           Mint
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <div className="flex inline-flex h-[28px] max-w-[500px] select-none items-center justify-center rounded-md border border-transparent bg-[rgba(217,48,78,0.2)] px-2 text-xs">
  //           <div className="mr-2 h-[6px] w-[6px] truncate rounded-md bg-[rgba(217,48,78,1)] font-medium"></div>
  //           Claim NFT
  //         </div>
  //       );
  //     }
  //   },
  //   enableSorting: false,
  // },
  // {
  //   accessorKey: "nft_address", // hiding
  // },
  // {
  //   accessorKey: "owner", // hiding
  // },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
