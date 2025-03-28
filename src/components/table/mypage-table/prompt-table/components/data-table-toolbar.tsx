'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

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
          placeholder="Search explanation..."
          value={
            (table.getColumn('response')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('response')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] border border-red-500 bg-black lg:w-[250px]"
        />
        {table.getColumn('result') && (
          <DataTableFacetedFilter
            column={table.getColumn('result')}
            title="Status"
            options={[
              { label: 'Success', value: true },
              { label: 'Failed', value: false },
            ]}
          />
        )}
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
