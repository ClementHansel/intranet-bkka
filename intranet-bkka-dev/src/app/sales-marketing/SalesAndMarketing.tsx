"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "./app-sidebar";
import CustomerRegistration from "./CustomerRegistration";

export default function Main() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("home"); // Default page

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "customer-registration":
        return <CustomerRegistration />;
      // Add more cases for other pages
      default:
        return <div className="p-4">Welcome to the Dashboard</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4">
        <AppSidebar
          onMenuItemClick={(url) => {
            const page = url.replace("#", ""); // Replace '#' with the page identifier
            handleNavigation(page);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-gray-100 overflow-y-auto">{renderPage()}</div>
    </div>
  );
}
