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

const purchasedOrderData = [
  {
    purchaseOrderNumber: "PO-1001",
    companyName: "Company A",
    contactPerson: "John Doe",
    salesName: "Jane Smith",
    status: "Processing Order",
  },
  {
    purchaseOrderNumber: "PO-1002",
    companyName: "Company B",
    contactPerson: "Alice Johnson",
    salesName: "Michael Brown",
    status: "Queueing Order",
  },
  {
    purchaseOrderNumber: "PO-1003",
    companyName: "Company C",
    contactPerson: "Brook Mcdough",
    salesName: "Elisa Crow",
    status: "On-site",
  },
  {
    purchaseOrderNumber: "PO-1004",
    companyName: "Company D",
    contactPerson: "Mark Libre",
    salesName: "Michael Brown",
    status: "Manufacturing",
  },
  {
    purchaseOrderNumber: "PO-1005",
    companyName: "Company E",
    contactPerson: "Gina Al'Ashwa",
    salesName: "Michael Brown",
    status: "Delivery",
  },
  {
    purchaseOrderNumber: "PO-1005",
    companyName: "Company E",
    contactPerson: "Gina Al'Ashwa",
    salesName: "Michael Brown",
    status: "Quality Check",
  },
  {
    purchaseOrderNumber: "PO-1006",
    companyName: "Company E",
    contactPerson: "Gina Al'Ashwa",
    salesName: "Michael Brown",
    status: "Installation",
  },
  {
    purchaseOrderNumber: "PO-1007",
    companyName: "Company E",
    contactPerson: "Gina Al'Ashwa",
    salesName: "Michael Brown",
    status: "Inspection",
  },
  {
    purchaseOrderNumber: "PO-1008",
    companyName: "Company E",
    contactPerson: "Gina Al'Ashwa",
    salesName: "Michael Brown",
    status: "Finished",
  },

  // Add more sample data...
];

const OrderTrackerPage = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<(typeof purchasedOrderData)[0]>[]>(
    () => [
      { accessorKey: "purchaseOrderNumber", header: "PO Number" },
      { accessorKey: "companyName", header: "Company Name" },
      { accessorKey: "contactPerson", header: "Contact Person Name" },
      { accessorKey: "salesName", header: "Sales Name" },
      { accessorKey: "status", header: "Status" },
      {
        id: "actions",
        cell: ({ row }) => (
          <Button
            onClick={() => handleViewDetails(row.original.purchaseOrderNumber)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View Details
          </Button>
        ),
      },
    ],
    []
  );

  const filteredData = purchasedOrderData.filter((purchasedOrder) => {
    const searchLower = globalFilter.toLowerCase();
    return (
      purchasedOrder.purchaseOrderNumber.toLowerCase().includes(searchLower) ||
      purchasedOrder.companyName.toLowerCase().includes(searchLower) ||
      purchasedOrder.contactPerson.toLowerCase().includes(searchLower) ||
      purchasedOrder.salesName.toLowerCase().includes(searchLower) ||
      purchasedOrder.status.toLowerCase().includes(searchLower)
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

  const handleViewDetails = (purchaseOrderNumber: string) => {
    console.log("Viewing details for:", purchaseOrderNumber);
  };

  return (
    <div className="p-6">
      <h1 className="flex justify-center my-4 font-bold text-[2rem]">
        Order Tracker
      </h1>
      <Input
        placeholder="Search Order..."
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
          {table.getFilteredRowModel().rows.length} of{" "}
          {purchasedOrderData.length} row(s)
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

export default OrderTrackerPage;
