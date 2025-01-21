"use client";

import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { TableData } from "@/app/sales-marketing/customer-detail/customers-detail-activities/data-table";
import { Input } from "@/components/ui/input";

interface DataTableProps {
  data: TableData[];
  onViewDetail?: (data: TableData) => void;
  onEdit?: (data: TableData) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  // onViewDetail = () => {}, // Default no-op
  // onEdit = () => {}, // Default no-op
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  // const handleViewDetailCallback = useCallback(onViewDetail, [onViewDetail]);
  // const handleEditCallback = useCallback(onEdit, [onEdit]);

  const columns = useMemo<ColumnDef<TableData>[]>(
    () => [
      {
        accessorKey: "dateTime",
        header: "Date and Time",
        cell: ({ row }) => {
          const date = row.original.dateTime;
          return date ? date.toLocaleString() : "";
        },
        filterFn: (row, columnId, value) => {
          const date = row.getValue(columnId);
          if (!date) return true;
          try {
            return date
              .toLocaleDateString()
              .toLowerCase()
              .includes(value.toLowerCase());
          } catch (error) {
            return true;
          }
        },
      },
      { accessorKey: "purchaseOrderNumber", header: "Purchase Order Number" },
      { accessorKey: "companyName", header: "Company Name" },
      { accessorKey: "contactPersonName", header: "Contact Person Name" },
      { accessorKey: "salesPerson", header: "Sales Person" },
      {
        id: "actions",
        cell: ({ row }) => (
          <Button
            // onClick={() => handleViewDetails(row.original.invoiceNumber)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View Details
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize: 20 } }, // Set initial page size
  });

  return (
    <div>
      <Input
        placeholder="Search..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(String(e.target.value))}
        className="max-w-sm mb-4"
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} of {data.length} row(s)
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
