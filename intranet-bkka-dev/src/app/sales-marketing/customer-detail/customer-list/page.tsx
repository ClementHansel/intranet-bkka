"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createColumns,
  MyFormData,
} from "@/app/sales-marketing/customer-detail/customer-list/column";
import MyForm from "@/app/sales-marketing/customer-detail/customer-list/form";
import { DataTable } from "@/app/sales-marketing/customer-detail/customer-list/data-table";

const initialData: MyFormData[] = [
  {
    id: "1",
    companyName: "PT. Mitrajaya Produksindo",
    contactPersonName: "John Doe",
    contactPersonNumber: "081112234567",
    contactPersonEmail: "john.doe@example.com",
    address: "123 Main St, Springfield, IL",
    dateRegister: new Date("1999-01-01"),
    salesPerson: "Kennedy",
    companyFiles: "Submitted",
  },
  {
    id: "2",
    companyName: "PT. Adijaya Madura",
    contactPersonName: "Jane Smith",
    contactPersonNumber: "9876543210",
    contactPersonEmail: "jane.smith@example.com",
    address: "456 Elm St, Springfield, IL",
    dateRegister: new Date("2000-02-02"),
    salesPerson: "Zulha",
    companyFiles: "Submitted",
  },
  {
    id: "3",
    companyName: "PT. Sukses Inc",
    contactPersonName: "Alice Johnson",
    contactPersonNumber: "1122334455",
    contactPersonEmail: "alice.johnson@example.com",
    address: "789 Oak St, Springfield, IL",
    dateRegister: new Date("2001-03-03"),
    salesPerson: "Linda Smith",
    companyFiles: "Submitted",
  },
];
export default function TableBuilder() {
  const [data, setData] = useState<MyFormData[]>(initialData);
  const [editingUser, setEditingUser] = useState<MyFormData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const columns = createColumns();

  const handleCreate = (newRecord: Omit<MyFormData, "id">) => {
    const record = { ...newRecord, id: String(data.length + 1) };
    setData([...data, record]);
    setIsDialogOpen(false);
  };

  const handleUpdate = (updatedUser: MyFormData) => {
    setData(
      data.map((record) =>
        record.id === updatedUser.id ? updatedUser : record
      )
    );
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleDelete = (id: string) => {
    setData(data.filter((record) => record.id !== id));
  };

  const handlemultiDelete = (users: MyFormData[]) => {
    const userIds = new Set(users.map((record) => record.id));
    setData(data.filter((record) => !userIds.has(record.id)));
  };

  const handleEdit = (record: MyFormData) => {
    setEditingUser(record);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };
  return (
    <div className="mx-5 py-10">
      <h1 className="flex justify-center my-4 font-bold text-[2rem]">
        Customers List
      </h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit" : "Create New"}</DialogTitle>
            <DialogDescription>
              Please fill out the form below to{" "}
              {editingUser ? "update the data" : "create a new data"}.
            </DialogDescription>
          </DialogHeader>
          <div>
            <MyForm
              onSubmit={editingUser ? handleUpdate : handleCreate}
              initialData={editingUser}
            />
          </div>
        </DialogContent>
      </Dialog>
      <DataTable
        columns={columns}
        data={data}
        onAdd={openCreateDialog}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onmultiDelete={handlemultiDelete}
      />
    </div>
  );
}
