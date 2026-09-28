"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartColumn, FileText, FolderKanban, Inbox, LayoutDashboard, Receipt, Users } from "lucide-react";
import { signOut } from "@/app/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const groups = [
  {
    label: "Content",
    items: [
      { href: "/admin/insights", label: "Insights", icon: FileText },
      { href: "/admin/indicators", label: "Indicators", icon: ChartColumn },
      { href: "/admin/team", label: "Team", icon: Users },
      { href: "/admin/messages", label: "Inbox", icon: Inbox },
    ],
  },
  {
    label: "Clients",
    items: [
      { href: "/admin/organizations", label: "Organizations", icon: Users },
      { href: "/admin/projects", label: "Projects", icon: FolderKanban },
      { href: "/admin/invoices", label: "Invoices", icon: Receipt },
    ],
  },
];

const labels: Record<string, string> = {
  admin: "Home",
  insights: "Insights",
  indicators: "Indicators",
  team: "Team",
  messages: "Inbox",
  organizations: "Organizations",
  projects: "Projects",
  invoices: "Invoices",
};

export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Staff home" render={<Link href="/admin" />} isActive={pathname === "/admin"}>
                <img src="/brand/mark.svg" alt="" className="size-8" />
                <span className="font-serif text-base">Eco Policy Nexus</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Home" render={<Link href="/admin" />} isActive={pathname === "/admin"}>
                    <LayoutDashboard />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {groups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton tooltip={item.label} render={<Link href={item.href} />} isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}>
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 px-1 group-data-[collapsible=icon]:justify-center">
            <Avatar>
              <AvatarImage src="/brand/mark.svg" alt="" />
              <AvatarFallback>EP</AvatarFallback>
            </Avatar>
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm font-medium">Staff</p>
              <p className="truncate text-xs text-sidebar-foreground/70">Eco Policy Nexus</p>
            </div>
          </div>
          <form action={signOut}>
            <input type="hidden" name="next" value="/admin/login" />
            <Button type="submit" variant="outline" className="w-full border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              Sign out
            </Button>
          </form>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <img src="/infographics/mountains.svg" alt="" className="pointer-events-none h-14 w-full bg-primary object-cover opacity-80" />
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>Staff</BreadcrumbItem>
              {parts.slice(1).map((part) => (
                <span key={part} className="contents">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{labels[part] || title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </span>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="animate-in fade-in slide-in-from-bottom-2 flex flex-1 flex-col gap-6 p-6 duration-500">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
