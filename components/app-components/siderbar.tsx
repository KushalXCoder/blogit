"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DocFreeIcons, Folder01FreeIcons, GitGraph, Graph, Plus, Settings, Star } from "@hugeicons/core-free-icons";
import { Icon } from "./icon-renderer";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const AppSidebar = () => {
  const router = useRouter();
  const sidebarItems = [
    { name: "Blogs", url: "/dashboard", icon: DocFreeIcons },
    { name: "Starred", url: "/dashboard/starred", icon: Star },
    { name: "Analytics", url: "/dashboard/analytics", icon: GitGraph },
    { name: 'Settings', url: "/dashboard/settings", icon: Settings }
  ];

  const handleClick = () => {
    router.push("/blog");
  }

  return (
    <Sidebar className="sticky h-full px-2 py-3 border-dashed">
      <SidebarHeader className="flex justify-between space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Image src="/logo.svg" alt="Logo" height={1000} width={1000} priority draggable={false} className="size-8" />
            <h1 className="text-xl">Blogit</h1>
          </div>
          <SidebarTrigger />
        </div>
        <Button onClick={handleClick} className="w-full border-gray-300 border-dashed bg-transparent hover:bg-accent text-black transition-colors">
          <Icon icon={Plus} />
          New Blog
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="">
          <SidebarGroupLabel className="">My Workspaces</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.name} className="mb-1">
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <Icon icon={item.icon} className="mr-2" />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}