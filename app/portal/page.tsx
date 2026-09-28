import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { requireClient } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

function invoiceProgress(status: string) {
  if (status === "paid") return 100;
  if (status === "open") return 66;
  return 20;
}

export default async function PortalHome() {
  const { organizationId } = await requireClient();
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select("id, name, summary").eq("organization_id", organizationId);
  const { data: invoices } = await supabase.from("invoices").select("id, title, status, amount_cents, currency, project_id").eq("organization_id", organizationId);
  const list = projects || [];
  const bills = invoices || [];
  return (
    <PortalShell title="Overview">
      <Card className="overflow-hidden p-0">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <CardHeader className="p-6">
            <CardTitle className="font-serif text-3xl">Your work with the firm</CardTitle>
            <CardDescription>Projects, files, and invoices assigned to your organization. Nothing here is visible on the public site.</CardDescription>
          </CardHeader>
          <img src="/infographics/bridge.svg" alt="Evidence connected to impact" className="h-full max-h-48 w-full bg-muted object-contain p-4" />
        </div>
      </Card>
      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="approach">Approach</TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="mt-4">
          {list.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <img src="/brand/mark.svg" alt="" className="size-14" />
                </EmptyMedia>
                <EmptyTitle>No projects yet</EmptyTitle>
                <EmptyDescription>Projects appear here when the firm assigns one to your organization.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {list.map((project) => {
                const related = bills.filter((invoice) => invoice.project_id === project.id);
                const paid = related.filter((invoice) => invoice.status === "paid").length;
                const progress = related.length ? Math.round((paid / related.length) * 100) : 0;
                return (
                  <Card key={project.id} className="transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <CardHeader>
                      <FolderKanban className="size-5 text-primary" />
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>{project.summary}</CardDescription>
                    </CardHeader>
                    <CardContent className="gap-4">
                      <Progress value={progress} />
                      <Button nativeButton={false} render={<Link href={`/portal/projects/${project.id}`} />} variant="outline">Open project</Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        <TabsContent value="invoices" className="mt-4 grid gap-4">
          {bills.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No invoices</EmptyTitle>
                <EmptyDescription>Invoices show here when the firm opens one for this organization.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : bills.map((invoice) => (
            <Card key={invoice.id}>
              <CardHeader>
                <CardTitle>{invoice.title}</CardTitle>
                <CardDescription>{(invoice.amount_cents / 100).toFixed(2)} {invoice.currency.toUpperCase()}</CardDescription>
              </CardHeader>
              <CardContent className="gap-3">
                <Badge variant="secondary">{invoice.status}</Badge>
                <Progress value={invoiceProgress(invoice.status)} />
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="approach" className="mt-4">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>How an assignment moves</CardTitle>
              <CardDescription>Local understanding, analytical rigor, strategic thinking, practical implementation, and a global perspective.</CardDescription>
            </CardHeader>
            <CardContent>
              <img src="/infographics/approach.svg" alt="Five steps from local understanding to global perspective" className="w-full rounded-lg bg-muted p-4" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
