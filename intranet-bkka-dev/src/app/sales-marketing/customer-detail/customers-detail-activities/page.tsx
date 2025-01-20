"use client";
import DataTable from "@/app/sales-marketing/customer-detail/customers-detail-activities/column";
import { mockData } from "@/app/sales-marketing/customer-detail/customers-detail-activities/mock-data";

const CustomersDetailActivities = () => {
  const handleViewDetail = (data) => {
    alert(JSON.stringify(data));
  };
  const handleEdit = (data) => {
    alert("Edit: " + JSON.stringify(data));
  };
  return (
    <div className="mx-5">
      <h1 className="flex justify-center my-8 font-bold text-[2rem]">
        Customer Detail Activities
      </h1>
      <DataTable
        data={mockData}
        onViewDetail={handleViewDetail}
        onEdit={handleEdit}
      />
    </div>
  );
};
export default CustomersDetailActivities;
