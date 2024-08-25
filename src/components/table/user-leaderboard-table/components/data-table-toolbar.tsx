"use client";

import { DataTableViewOptions } from "./data-table-view-options";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={event => {
            const value = event.target.value;
            table.getColumn("name")?.setFilterValue(value);
          }}
          className="h-8 w-[150px] border border-red-500 bg-black lg:w-[250px]"
        />
        <Input
          placeholder="Search by address"
          value={
            (table.getColumn("wallet_address")?.getFilterValue() as string) ??
            ""
          }
          onChange={event => {
            const value = event.target.value;
            table.getColumn("wallet_address")?.setFilterValue(value);
          }}
          className="h-8 w-[150px] border border-red-500 bg-black lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 border border-red-500 bg-black px-2 hover:bg-black hover:text-red-500 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4 border border-red-500 bg-black" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
