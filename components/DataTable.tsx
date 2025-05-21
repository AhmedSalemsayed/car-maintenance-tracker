"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MaintenanceItem } from "@/lib/zodSchemas";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export default function DataTable({
  columns,
  data,
}: DataTableProps<MaintenanceItem>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Table className="bg-white rounded-md p-4">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, i) => {
              return (
                <TableHead
                  className={` bg-slate-100 text-slate-700 font-semibold text-xs lg:text-sm text-center ${
                    i === 0
                      ? "sticky left-0 z-30 bg-slate-100 text-slate-700"
                      : ""
                  }`}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className=" hover:shadow-md relative transition-all duration-300 ease-in-out"
            >
              {row.getVisibleCells().map((cell, i) => (
                <TableCell
                  key={cell.id}
                  className={`border-b border-slate-200 text-center  ${
                    i === 0
                      ? "sticky left-0  bg-slate-100 text-slate-700  "
                      : ""
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
