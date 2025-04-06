"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";
import { signOutAction } from "@/lib/actions/users";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  ClipboardCheck,
  LogOut,
  Users,
  RotateCw,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}
export function SidebarNav({
  user,
}: {
  children?: React.ReactNode;
  user?: {
    name: string;
    image: string;
    email: string;
  };
}) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      isActive: pathname === "/dashboard",
    },
    {
      title: "Quiz",
      href: "/quiz",
      icon: ClipboardCheck,
      isActive: pathname === "/quiz",
    },
    {
      title: "Leaderboard",
      href: "/leaderboard",
      icon: Users,
      isActive: pathname === "/leaderboard",
    },
  ];

  const { pending } = useFormStatus();

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="border-r-0 bg-[#0f172a] dark:bg-slate-950 dark:text-white"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 -ms-2 py-2">
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="User avatar"
            />
            <AvatarFallback>LH</AvatarFallback>
          </Avatar>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                className={
                  item.isActive
                    ? "bg-slate-800 text-slate-500 dark:bg-white dark:text-slate-950  hover:text-[#0f172a]"
                    : "hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                }
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon
                    className={`w-5 h-5 ${
                      item.isActive
                        ? "text-[#0f172a] dark:text-slate-950"
                        : "text-slate-600"
                    }`}
                  />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="mt-auto -4 border-t border-slate-200 dark:border-slate-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={""}>
              <div className="flex items-center gap-3 p-2">
                <div className="flex items-center py-2">
                  <Avatar className="w-5 h-5 ">
                    <AvatarImage
                      src={user?.image || "/placeholder.svg?height=40&width=40"}
                      alt="User avatar"
                    />
                    <AvatarFallback>
                      {user && user.name
                        ? user.name
                            ?.split(" ")
                            .map((word) => word[0].toUpperCase())
                            .join("")
                        : "~"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex items-center justify-between basis-full">
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                  </div>
                  <div>
                    <form
                      action={signOutAction as unknown as () => Promise<void>}
                      className="w-full text-left"
                    >
                      <Button
                        type="submit"
                        disabled={pending}
                        variant={"outline"}
                        className="p-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 transition-colors"
                      >
                        {pending ? (
                          <RotateCw className="w-5 h-5 text-destructive animate-spin" />
                        ) : (
                          <LogOut className="w-5 h-5 text-destructive" />
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
