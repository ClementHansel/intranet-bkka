"use client";
import DataTable from "@/app/sales-marketing/orders-detail/orders-activity/data-table";
import { mockData } from "@/app/sales-marketing/orders-detail/orders-activity/mock-data";

const OrdersActivities = () => {
  const handleViewDetail = (data) => {
    alert(JSON.stringify(data));
  };
  const handleEdit = (data) => {
    alert("Edit: " + JSON.stringify(data));
  };
  return (
    <div className="mx-5">
      <h1 className="flex justify-center my-8 font-bold text-[2rem]">
        Orders Detail Activities
      </h1>
      <DataTable
        data={mockData}
        onViewDetail={handleViewDetail}
        onEdit={handleEdit}
      />
    </div>
  );
};
export default OrdersActivities;
