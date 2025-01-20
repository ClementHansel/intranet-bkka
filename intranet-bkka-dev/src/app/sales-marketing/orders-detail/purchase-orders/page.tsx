"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListOfItems from "./ListOfItems";
import PurchasedOrderManager from "./purchased-order-manager";

const PurchaseOrder: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [file, setFile] = useState<File | null>(null); // Add state for file
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    contactNumber: "",
    contactEmail: "",
    companyAddress: "",
    projectName: "",
    projectAddress: "",
    salesName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        itemName: "",
        quantity: 1,
        itemPrice: 0,
        totalItemPrice: 0,
      },
    ]);
  };

  const removeRow = (id: number) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    updateTotal(updatedRows);
  };

  const updateRow = (id: number, field: string, value: any) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        if (field === "itemName") {
          const selectedItem = ListOfItems.find((item) => item.name === value);
          if (selectedItem) {
            updatedRow.itemPrice = selectedItem.price;
            updatedRow.totalItemPrice =
              updatedRow.quantity * selectedItem.price;
          }
        } else if (field === "quantity") {
          updatedRow.totalItemPrice = updatedRow.itemPrice * value;
        }
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
    updateTotal(updatedRows);
  };

  const updateTotal = (updatedRows: any[]) => {
    const total = updatedRows.reduce((acc, row) => acc + row.totalItemPrice, 0);
    setTotalPrice(total);
  };

  const handleSubmit = () => {
    const orderData = {
      ...formData,
      items: rows,
      totalPrice,
      file, // Include the file in the submitted data
    };

    if (!orderData.file) {
      toast.error("Please upload a file.");
      return;
    }

    PurchasedOrderManager.addOrder(orderData); // Save data to PurchasedOrderManager
    toast.success("Order submitted successfully!");

    // Create and download a mock-purchase-orders.json file
    const jsonData = JSON.stringify(orderData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mock-purchase-orders.json";
    link.click();

    // Reset the form
    setRows([]);
    setFormData({
      companyName: "",
      contactPerson: "",
      contactNumber: "",
      contactEmail: "",
      companyAddress: "",
      projectName: "",
      projectAddress: "",
      salesName: "",
    });
    setTotalPrice(0);
    setFile(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="flex justify-center text-3xl font-bold mb-4">
        Purchase Order
      </h1>
      <ToastContainer /> {/* Add Toast Container */}
      {/* Input Fields */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <input
          className="border rounded p-2"
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleInputChange}
        />
        <input
          className="border rounded p-2"
          type="text"
          name="contactPerson"
          placeholder="Contact Person"
          value={formData.contactPerson}
          onChange={handleInputChange}
        />
        <input
          className="border rounded p-2"
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleInputChange}
        />
        <input
          className="border rounded p-2"
          type="email"
          name="contactEmail"
          placeholder="Contact Email"
          value={formData.contactEmail}
          onChange={handleInputChange}
        />
        <input
          className="border rounded p-2"
          type="text"
          name="companyAddress"
          placeholder="Company Address"
          value={formData.companyAddress}
          onChange={handleInputChange}
        />
        <input
          className="border rounded p-2"
          type="text"
          name="projectName"
          placeholder="Project Name (Optional)"
          value={formData.projectName}
          onChange={handleInputChange}
        />
        <input
          className="border rounded p-2"
          type="text"
          name="projectAddress"
          placeholder="Project Address (Optional)"
          value={formData.projectAddress}
          onChange={handleInputChange}
        />
      </div>
      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Item Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Item Price</th>
            <th className="border border-gray-300 px-4 py-2">Total Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  className="border rounded p-2 w-full"
                  value={row.itemName}
                  onChange={(e) =>
                    updateRow(row.id, "itemName", e.target.value)
                  }
                >
                  <option value="">Select Item</option>
                  {ListOfItems.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      updateRow(
                        row.id,
                        "quantity",
                        Math.max(row.quantity - 1, 0)
                      )
                    }
                  >
                    -
                  </button>
                  <span className="px-2">{row.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      updateRow(row.id, "quantity", row.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center">
                  <span>Rp. </span>
                  <input
                    className="border rounded p-1 w-full"
                    type="text" // Changed from 'number' to 'text'
                    value={row.itemPrice}
                    onChange={(e) =>
                      updateRow(
                        row.id,
                        "itemPrice",
                        e.target.value.replace(/\D/g, "")
                      )
                    } // Only allow numbers
                  />
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                Rp. {row.totalItemPrice}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.itemName && (
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => removeRow(row.id)}
                  >
                    ✕
                  </button>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td
              colSpan={6}
              className="text-center border border-gray-300 px-4 py-2"
            >
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={addRow}
              >
                Add Item
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* Total */}
      <div className="text-right font-bold text-lg mb-6">
        Total: {totalPrice}
      </div>
      {/* Sales Name */}
      <input
        className="border rounded p-2 w-full mb-4"
        type="text"
        name="salesName"
        placeholder="Sales Name"
        value={formData.salesName}
        onChange={handleInputChange}
      />
      {/* File Upload */}
      <input
        className="border rounded p-2 w-full mb-4"
        type="file"
        onChange={handleFileUpload}
      />
      {/* Submit Button */}
      <button
        className="px-6 py-2 bg-green-500 text-white rounded"
        onClick={handleSubmit}
      >
        Submit Order
      </button>
    </div>
  );
};

export default PurchaseOrder;
