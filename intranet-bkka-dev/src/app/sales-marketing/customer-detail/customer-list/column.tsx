"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//type
export interface MyFormData {
  id: string;
  companyName: string;
  contactPersonName: string;
  contactPersonNumber: string;
  contactPersonEmail: string;
  address: string;
  dateRegister: Date;
  salesPerson: string;
  companyFiles: string;
}

interface ColumnActions {
  onViewDetail?: (data: MyFormData) => void; // Make onViewDetail optional
  onEdit?: (data: MyFormData) => void;
  onDelete?: (id: string) => void;
}

// Function to display customer details in a popup (example using alert)
const viewCustomerDetail = (data: MyFormData) => {
  alert(
    `Customer Details:\n  - Company Name: ${
      data.companyName
    }\n  - Contact Person: ${data.contactPersonName}\n  - Contact Number: ${
      data.contactPersonNumber
    }\n  - Email: ${data.contactPersonEmail}\n  - Address: ${
      data.address
    }\n  - Date Register: ${data.dateRegister.toLocaleDateString()}\n  - Sales Person: ${
      data.salesPerson
    }\n  - Company Files: ${data.companyFiles}`
  );
};

export const createColumns = (): ColumnDef<MyFormData>[] => {
  const columns: ColumnDef<MyFormData>[] = [
    {
      accessorKey: "companyName",
      header: "Company Name",
    },
    {
      accessorKey: "contactPersonName",
      header: "Contact Person Name",
    },
    {
      accessorKey: "contactPersonNumber",
      header: "Contact Person Number",
    },
    {
      accessorKey: "contactPersonEmail",
      header: "Contact Person Email",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "dateRegister",
      header: "Date Register",
    },
    {
      accessorKey: "salesPerson",
      header: "Sales Person",
    },
    {
      accessorKey: "companyFiles",
      header: "Company Files",
    },
  ];

  columns.push({
    id: "actions",
    cell: ({ row, table }) => {
      const record = row.original;
      const meta = table.options.meta as ColumnActions; // Get the meta object
      const onViewDetail = meta?.onViewDetail; // Safely access onViewDetail
      const { onEdit, onDelete } = table.options.meta as ColumnActions;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Options</DropdownMenuLabel>

            {onViewDetail && (
              <DropdownMenuItem onClick={() => onViewDetail(record)}>
                View Detail
              </DropdownMenuItem>
            )}

            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(record)}>
                Edit
              </DropdownMenuItem>
            )}

            {onDelete && (
              <DropdownMenuItem onClick={() => onDelete(record.id)}>
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  });

  return columns;
};
