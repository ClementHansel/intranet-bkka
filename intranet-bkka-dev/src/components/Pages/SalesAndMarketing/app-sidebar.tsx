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

import { NavMain } from "@/components/Pages/SalesAndMarketing/nav-main";
import { NavProjects } from "@/components/Pages/SalesAndMarketing/nav-projects";
import { NavUser } from "@/components/Pages/SalesAndMarketing/nav-user";
import { TeamSwitcher } from "@/components/Pages/SalesAndMarketing/team-switcher";
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
          title: "Admin",
          url: "/admin",
        },
        {
          title: "Customer Registration",
          url: "/admin/customers/registration",
        },
        {
          title: "Customers List",
          url: "#",
        },
        {
          title: "Customers Detail Activities",
          url: "#",
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
          url: "#",
        },
        {
          title: "Purchase Orders",
          url: "#",
        },
        {
          title: "Invoices",
          url: "#",
        },
        {
          title: "Order Tracker",
          url: "#",
        },
        {
          title: "Special Notes",
          url: "#",
        },
        {
          title: "Addendum",
          url: "#",
        },
        {
          title: "After Sales Requests",
          url: "#",
        },
        {
          title: "Orders Activities",
          url: "#",
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
          url: "#",
        },
        {
          title: "Prospects",
          url: "#",
        },
        {
          title: "Under Review",
          url: "#",
        },
        {
          title: "Sales List",
          url: "#",
        },
        {
          title: "Terminated Sales",
          url: "#",
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
