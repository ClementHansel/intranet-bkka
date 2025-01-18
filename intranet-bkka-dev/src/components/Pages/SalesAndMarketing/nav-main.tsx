"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side navigation
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

// Define the type for menu items
interface MenuItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SubMenuItem[]; // Array of submenu items
}

// Define the type for submenu items
interface SubMenuItem {
  title: string;
  url: string;
  items?: SubMenuItem[]; // Nested submenus
}

export function NavMain({ items }: { items: MenuItem[] }) {
  const router = useRouter();

  const handleNavigation = (url: string) => {
    router.push(url); // Navigate to the specified URL
  };

  const renderSubItems = (subItems: SubMenuItem[]) => {
    return (
      <SidebarMenuSub>
        {subItems.map((subItem) => (
          <SidebarMenuSubItem key={subItem.title}>
            {subItem.items ? (
              <Collapsible asChild>
                <SidebarMenuSubButton>
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center">
                      <span>{subItem.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {renderSubItems(subItem.items)}
                  </CollapsibleContent>
                </SidebarMenuSubButton>
              </Collapsible>
            ) : (
              <SidebarMenuSubButton asChild>
                <button onClick={() => handleNavigation(subItem.url)}>
                  <span>{subItem.title}</span>
                </button>
              </SidebarMenuSubButton>
            )}
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Sales and Marketing</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive} // Open by default if active
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {item.items && renderSubItems(item.items)}
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
