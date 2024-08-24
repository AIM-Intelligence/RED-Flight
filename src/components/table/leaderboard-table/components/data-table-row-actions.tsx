"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  //console.log(row);
  //const task = PromptNFT.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-8 w-8 p-0 data-[state=open]:bg-red-500"
          disabled={!!row}
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px] border-red-500 bg-black text-white"
      >
        <DropdownMenuItem className="focus:bg-black focus:text-red-500">
          Claim
        </DropdownMenuItem>
        <DropdownMenuSeparator className="border-[0.5px] border-red-500" />
        <DropdownMenuItem className="focus:bg-black focus:text-red-500">
          Favorite
        </DropdownMenuItem>
        <DropdownMenuSeparator className="border-[0.5px] border-red-500" />
        <DropdownMenuItem className="focus:bg-black focus:text-red-500">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
