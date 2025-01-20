import { TableData } from "@/app/sales-marketing/customer-detail/customers-detail-activities/data-table";

export const mockData: TableData[] = Array.from({ length: 100 }, (_, i) => ({
  id: String(i + 1),
  dateTime: new Date(Date.now() - i * 1000 * 60 * 60), // Example dates
  companyName: `Company ${i + 1}`,
  contactPersonName: `Person ${i + 1}`,
  message: `Message ${i + 1}`,
  salesPerson: `Salesperson ${(i % 5) + 1}`, // Distribute among 5 salespeople
}));
