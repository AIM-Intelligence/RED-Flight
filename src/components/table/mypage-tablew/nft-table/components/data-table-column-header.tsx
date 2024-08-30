import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            className="-ml-3 h-8 bg-black hover:bg-black hover:text-red-500 data-[state=open]:text-red-500"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="border-red-500 bg-black text-white"
        >
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            className="focus:bg-black focus:text-red-500"
          >
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            className="focus:bg-black focus:text-red-500"
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-[0.5px] border-red-500" />
          <DropdownMenuItem
            onClick={() => column.toggleVisibility(false)}
            className="focus:bg-black focus:text-red-500"
          >
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
