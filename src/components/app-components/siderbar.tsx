"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DocFreeIcons, GitGraph, Plus, Settings, Star } from "@hugeicons/core-free-icons";
import { Icon } from "./icon-renderer";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import Link from "next/link";
import { LogoutButton } from "./auth/logout";
import { blogStore } from "@/store/blog.store";

export const AppSidebar = () => {
  const { reset } = blogStore();
  const router = useRouter();

  const sidebarItems = [
    { name: "Blogs", url: "/dashboard", icon: DocFreeIcons },
    { name: 'Drafts', url: "/dashboard/drafts", icon: DocFreeIcons },
    { name: "Starred", url: "/dashboard/starred", icon: Star },
    { name: "Analytics", url: "/dashboard/analytics", icon: GitGraph },
    { name: 'Settings', url: "/dashboard/settings", icon: Settings }
  ];

  const handleClick = () => {
    reset(); // Reset the user store state
    router.push("/create"); // Redirect to the create page
  }

  return (
    <Sidebar className="sticky h-full px-2 py-3 border-dashed">
      <SidebarHeader className="flex justify-between space-y-2">
        <div className="flex justify-between items-center">
          <Logo className="text-2xl" iconClassname="size-7" />
          <SidebarTrigger />
        </div>
        <Button onClick={handleClick} className="w-full border-gray-300 border-dashed bg-transparent hover:bg-accent text-black transition-colors">
          <Icon icon={Plus} />
          New Blog
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Workspaces</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.name} className="mb-1">
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <Icon icon={item.icon} className="mr-2" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  )
}