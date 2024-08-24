"use client";

import * as React from "react";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useModal } from "@/store/use-modal-store";
import { Database } from "@/validation/types/supabase";

type RED_Prompt = Database["public"]["Tables"]["prompt nft"]["Row"];

type User = {
  name: string;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "level", desc: true }, // 1. Level 내림차순
    { id: "conversation", desc: false }, // 2. Conversation 오름차순
    { id: "length", desc: false }, // 3. Length 오름차순
  ]);
  const { onOpen } = useModal();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: (row, columnId, filterValue) => {
      const user = row.getValue("user") as User;
      const creator = row.getValue("creator") as string;

      const userName = user?.name?.toLowerCase() || "";
      const creatorAddress = creator?.toLowerCase() || "";
      const searchValue = filterValue.toLowerCase();

      return (
        userName.includes(searchValue) || creatorAddress.includes(searchValue)
      );
    },
  });

  const handleRowClick = (row: { original: RED_Prompt }) => {
    console.log(row.original);
    const red_prompt = row.original;
    if (red_prompt) {
      onOpen("showRedPromptData", { red_prompt });
    } else {
      console.log("No prompt available");
    }
  };

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border-2 border-red-500">
        <Table>
          <TableHeader className="border-b border-red-500">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className="border-red-500 bg-black hover:bg-black"
              >
                <TableHead className="text-white">Rank</TableHead>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="text-white"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleRowClick(row as any)}
                  className="border-b border-t border-red-500 hover:bg-red-500/50 data-[state=selected]:bg-red-700/50"
                >
                  <TableCell>{pageIndex * pageSize + index + 1}</TableCell>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
