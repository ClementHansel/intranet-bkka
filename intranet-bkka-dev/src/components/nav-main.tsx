"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

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

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      items?: { title: string; url: string }[]; // Allow deeper nesting
    }[];
  }[];
}) {
  const renderSubItems = (subItems: any[]) => {
    return (
      <SidebarMenuSub>
        {subItems.map((subItem) => (
          <SidebarMenuSubItem key={subItem.title}>
            {subItem.items ? ( // Check for nested items
              <Collapsible
                asChild
                defaultOpen={false} // Closed by default for nested submenus
              >
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
                <a href={subItem.url}>
                  <span>{subItem.title}</span>
                </a>
              </SidebarMenuSubButton>
            )}
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive} // Open by default for active items
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
