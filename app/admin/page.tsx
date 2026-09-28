import Link from "next/link";
import { ChartColumn, FileText, FolderKanban, Inbox, Receipt, Users } from "lucide-react";
import { IndicatorChart } from "@/components/indicator-chart";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { displayValue, getIndicators, requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

const shortcuts = [
  { href: "/admin/insights", title: "Insights", body: "Publish commentary the public site can show.", icon: FileText, image: "/infographics/story-flow.svg" },
  { href: "/admin/indicators", title: "Indicators", body: "Correct a figure or set an override.", icon: ChartColumn, image: "/infographics/sdg-ring.svg" },
  { href: "/admin/team", title: "Team", body: "Add a published profile.", icon: Users, image: "/infographics/approach.svg" },
  { href: "/admin/messages", title: "Inbox", body: "Read messages from the contact form.", icon: Inbox, image: "/infographics/bridge.svg" },
  { href: "/admin/organizations", title: "Organizations", body: "Invite a client and share a one-time password.", icon: Users, image: "/infographics/world-map.svg" },
  { href: "/admin/projects", title: "Projects", body: "Open a project and upload a file.", icon: FolderKanban, image: "/infographics/mountains.svg" },
  { href: "/admin/invoices", title: "Invoices", body: "Create an invoice when Stripe keys are set.", icon: Receipt, image: "/brand/mark.svg" },
];

function figure(raw: string) {
  const match = raw.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

export default async function AdminHome() {
  await requireStaff();
  const supabase = await createClient();
  const [insights, messages, projects, invoices, indicators] = await Promise.all([
    supabase.from("insights").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("invoices").select("id", { count: "exact", head: true }),
    getIndicators(),
  ]);
  const stats = [
    { label: "Insights", value: insights.count ?? 0 },
    { label: "Messages", value: messages.count ?? 0 },
    { label: "Projects", value: projects.count ?? 0 },
    { label: "Invoices", value: invoices.count ?? 0 },
  ];
  const chart = indicators.slice(0, 8).map((item) => ({ label: item.label.split(" ")[0], value: figure(displayValue(item)) }));
  return (
    <AdminShell title="Staff home">
      <Card className="overflow-hidden p-0">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <CardHeader className="p-6">
            <CardTitle className="font-serif text-3xl">Staff workspace</CardTitle>
            <CardDescription>Publish insights, correct indicators, add team profiles, read messages, and invite a client organization. Payments stay hidden until Stripe keys are set.</CardDescription>
          </CardHeader>
          <img src="/infographics/world-map.svg" alt="Global reach" className="h-full max-h-48 w-full bg-muted object-contain p-4" />
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${index * 70}ms` }}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="font-serif text-3xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Indicator snapshot</CardTitle>
          <CardDescription>The leading number from each public figure. Overrides win over the stored value.</CardDescription>
        </CardHeader>
        <CardContent>
          <IndicatorChart data={chart} />
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {shortcuts.map((item) => (
          <HoverCard key={item.href}>
            <HoverCardTrigger render={<Link href={item.href} className="block" />}>
              <Card className="h-full transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader>
                  <item.icon className="size-5 text-primary" />
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Open</Button>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <img src={item.image} alt="" className="mb-3 h-24 w-full rounded-md bg-muted object-contain" />
              <p className="font-medium">{item.title}</p>
              <p className="text-muted-foreground">{item.body}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </AdminShell>
  );
}
