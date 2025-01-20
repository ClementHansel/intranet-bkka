"use client";
import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { Input } from "@/components/ui/input";

const invoiceData = [
  {
    invoiceNumber: "INV-1001",
    companyName: "Company A",
    contactPerson: "John Doe",
    salesName: "Jane Smith",
    status: "Paid",
  },
  {
    invoiceNumber: "INV-1002",
    companyName: "Company B",
    contactPerson: "Alice Johnson",
    salesName: "Michael Brown",
    status: "Pending",
  },
  // Add more sample data...
];

const InvoicePage = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<(typeof invoiceData)[0]>[]>(
    () => [
      { accessorKey: "invoiceNumber", header: "Invoice Number" },
      { accessorKey: "companyName", header: "Company Name" },
      { accessorKey: "contactPerson", header: "Contact Person Name" },
      { accessorKey: "salesName", header: "Sales Name" },
      { accessorKey: "status", header: "Status" },
      {
        id: "actions",
        cell: ({ row }) => (
          <Button
            onClick={() => handleViewDetails(row.original.invoiceNumber)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View Details
          </Button>
        ),
      },
    ],
    []
  );

  const filteredData = invoiceData.filter((invoice) => {
    const searchLower = globalFilter.toLowerCase();
    return (
      invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
      invoice.companyName.toLowerCase().includes(searchLower) ||
      invoice.contactPerson.toLowerCase().includes(searchLower) ||
      invoice.salesName.toLowerCase().includes(searchLower) ||
      invoice.status.toLowerCase().includes(searchLower)
    );
  });

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize: 20 } },
  });

  const handleViewDetails = (invoiceNumber: string) => {
    console.log("Viewing details for:", invoiceNumber);
  };

  return (
    <div className="p-6">
      <h1 className="flex justify-center my-4 font-bold text-[2rem]">
        Special Notes
      </h1>
      <Input
        placeholder="Search invoices..."
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
          {table.getFilteredRowModel().rows.length} of {invoiceData.length}{" "}
          row(s)
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

export default InvoicePage;
