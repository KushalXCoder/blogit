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
import { DocFreeIcons, GitGraph, Github, Plus, Settings } from "@hugeicons/core-free-icons";
import { Icon } from "./icon-renderer";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "./logo";
import Link from "next/link";
import { blogStore } from "@/store/blog.store";
import { userStore } from "@/store/user.store";
import { userLogout } from "@/services/auth.service";
import { redirectTo } from "@/app/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { isPlatformConnected } from "@/lib/helper/connections";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  HelpCircle,
  MessageSquare,
  ChevronsUpDown,
  LogOut,
  User,
  Sparkles,
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";

export const AppSidebar = () => {
  const { reset: resetBlog } = blogStore();
  const { username, email, image, connections, reset: resetUser } = userStore();
  const router = useRouter();
  const pathname = usePathname();

  const sidebarItems = [
    { name: "Blogs", url: "/dashboard", icon: DocFreeIcons },
    { name: "Analytics", url: "/dashboard/analytics", icon: GitGraph },
    { name: "Settings", url: "/dashboard/settings", icon: Settings },
  ];

  const handleClick = () => {
    resetBlog();
    router.push("/create");
  };

  const handleLogout = async () => {
    try {
      const res = await userLogout();
      if (!res) {
        toast.error("Failed to logout user");
        return;
      }
      resetUser();
      await redirectTo("/");
      toast.success("Logout successful!");
    } catch (error) {
      if (error instanceof Error && (error.message === "NEXT_REDIRECT" || error.message.includes("NEXT_REDIRECT"))) return;
      console.error("Error logging out:", error);
      toast.error(error instanceof Error ? error.message : "Failed to logout user");
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <Sidebar className="px-2 py-3 border-dashed">
      <SidebarHeader className="flex justify-between space-y-2">
        <div className="flex justify-between items-center">
          <Logo className="text-2xl" iconClassname="size-7" />
          <SidebarTrigger />
        </div>
        <Button
          onClick={handleClick}
          className="w-full border-gray-300 border-dashed bg-transparent hover:bg-accent text-black transition-colors"
        >
          <Icon icon={Plus} />
          New Blog
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Workspaces</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isActive = item.url === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.name} className="mb-1">
                    <SidebarMenuButton isActive={isActive} asChild>
                      <Link href={item.url} prefetch={false}>
                        <Icon icon={item.icon} className="mr-2" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Publishing Channels</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mb-1">
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/settings" className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <img src="/devto.webp" alt="Dev.to" className="w-4 h-4 rounded-sm object-contain" />
                      <span>Dev.to</span>
                    </div>
                    <span
                      className={cn(
                        "size-2 rounded-full transition-all duration-300",
                        isPlatformConnected(connections, "devto") ? "bg-emerald-500 animate-pulse" : "bg-neutral-300"
                      )}
                    />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="mb-1">
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/settings" className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 39 39" className="w-4 h-4 fill-current">
                        <path d="M2.68 13.032c-3.573 3.505-3.573 9.363 0 12.936L13.032 36.32c3.505 3.573 9.363 3.573 12.936 0L36.32 25.968c3.573-3.573 3.573-9.431 0-12.936L25.968 2.68c-3.573-3.573-9.431-3.573-12.936 0zm12.211 1.935c2.507-2.521 6.582-2.544 9.104-.038s2.544 6.582.038 9.104-6.582 2.544-9.104.038-2.544-6.582-.038-9.104" />
                      </svg>
                      <span>Hashnode</span>
                    </div>
                    <span
                      className={cn(
                        "size-2 rounded-full transition-all duration-300",
                        isPlatformConnected(connections, "hashnode") ? "bg-emerald-500 animate-pulse" : "bg-neutral-300"
                      )}
                    />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mb-1">
                <SidebarMenuButton asChild>
                  <a href="https://github.com/KushalXCoder/blogit" target="_blank" rel="noopener noreferrer">
                    <HugeiconsIcon icon={Github} />
                    <span>Github</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="mb-1">
                <SidebarMenuButton asChild>
                  <a href="mailto:support@blogit.com">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Feedback</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="w-full justify-between items-center px-2 py-1.5 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex items-center gap-2 text-left min-w-0">
                    <Avatar size="sm" className="rounded-full border border-border">
                      <AvatarImage src={image} alt={username} />
                      <AvatarFallback className="rounded-full bg-primary/10 text-primary font-semibold text-xs">
                        {getInitials(username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 leading-none">
                      <span className="font-semibold text-sm text-foreground truncate">{username || "User"}</span>
                      <span className="text-xs text-muted-foreground truncate">{email}</span>
                    </div>
                  </div>
                  <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                sideOffset={8}
                className="w-56"
              >
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-medium leading-none">Other Options</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="w-full cursor-pointer flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile Details</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="w-full cursor-pointer flex items-center text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
