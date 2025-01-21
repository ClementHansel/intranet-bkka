"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/app/sales-marketing/nav-main";
import { NavProjects } from "@/app/sales-marketing/nav-projects";
import { NavUser } from "@/app/sales-marketing/nav-user";
import { TeamSwitcher } from "@/app/sales-marketing/team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Clement Hansel",
    email: "hansel@bkka.co.id",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "PT. Batukarang Kenan Abadi",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "PT. Manufaktur Jembatan Timbang",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "PT. Manufaktur Equipment",
      logo: Command,
      plan: "Free",
    },
    {
      name: "PT. Manufaktur Robotics",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: SquareTerminal,
    },
    {
      title: "Customers Detail",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Customer Registration",
          url: "/sales-marketing/customer-detail/customer-registration",
        },
        {
          title: "Customers List",
          url: "/sales-marketing/customer-detail/customer-list",
        },
        {
          title: "Customers Detail Activities",
          url: "/sales-marketing/customer-detail/customers-detail-activities",
        },
      ],
    },
    {
      title: "Orders Detail",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Quotation Generator",
          url: "/sales-marketing/orders-detail/quotation-generator",
        },
        {
          title: "Purchase Order",
          url: "/sales-marketing/orders-detail/purchase-orders",
        },
        {
          title: "Invoices List",
          url: "/sales-marketing/orders-detail/invoices-list",
        },
        {
          title: "Order Tracker",
          url: "/sales-marketing/orders-detail/order-tracker",
        },
        {
          title: "Special Notes",
          url: "/sales-marketing/orders-detail/special-notes",
        },
        {
          title: "Addendum",
          url: "/sales-marketing/orders-detail/addendum",
        },
        {
          title: "After Sales Requests",
          url: "/sales-marketing/orders-detail/after-sales-requests",
        },
        {
          title: "Orders Activities",
          url: "/sales-marketing/orders-detail/orders-activity",
        },
      ],
    },
    {
      title: "Sales",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Target Sales",
          url: "/sales-marketing/sales/target-sales",
        },
        {
          title: "Prospects",
          url: "/sales-marketing/sales/prospects",
        },
        {
          title: "Under Review",
          url: "/sales-marketing/sales/under-review",
        },
        {
          title: "Sales List",
          url: "/sales-marketing/sales/sales-list",
        },
        {
          title: "Terminated Sales",
          url: "/sales-marketing/sales/terminated-sales",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Campaign Information",
          url: "#",
        },
        {
          title: "Target",
          url: "#",
        },
        {
          title: "Social Media",
          url: "#",
        },
        {
          title: "Design",
          url: "#",
        },
      ],
    },
    {
      title: "Team Progress",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Achievements",
          url: "#",
        },
        {
          title: "News",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
        {
          title: "Problems",
          url: "#",
        },
        {
          title: "Suggestions",
          url: "#",
        },
      ],
    },
    {
      title: "Internal Requests",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Entertainment",
          url: "#",
        },
        {
          title: "Sick Leave",
          url: "#",
        },
        {
          title: "Paid Leave",
          url: "#",
        },
        {
          title: "UnPaid Leave",
          url: "#",
        },
        {
          title: "Loan",
          url: "#",
        },
        {
          title: "History",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
