import { notFound } from "next/navigation";
import { PortalShell } from "@/components/portal-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Progress } from "@/components/ui/progress";
import { requireClient } from "@/lib/data";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { organizationId } = await requireClient();
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).eq("organization_id", organizationId).maybeSingle();
  if (!project) notFound();
  const { data: files } = await supabase.from("project_files").select("*").eq("project_id", id);
  const { data: invoices } = await supabase.from("invoices").select("*").eq("project_id", id);
  const admin = createAdminClient();
  const links = await Promise.all((files || []).map(async (file) => {
    const signed = admin ? await admin.storage.from("project-files").createSignedUrl(file.storage_path, 60) : null;
    return { ...file, url: signed?.data?.signedUrl };
  }));
  return (
    <PortalShell title={project.name}>
      <Card className="overflow-hidden p-0">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <CardHeader className="p-6">
            <CardTitle className="font-serif text-3xl">{project.name}</CardTitle>
            <CardDescription>{project.summary}</CardDescription>
          </CardHeader>
          <img src="/infographics/world-map.svg" alt="Global reach" className="h-full max-h-48 w-full bg-muted object-contain p-4" />
        </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
          <CardDescription>{links.length ? `${links.length} file${links.length === 1 ? "" : "s"} shared with you.` : "No files have been uploaded yet."}</CardDescription>
        </CardHeader>
        <CardContent className="gap-2">
          {links.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No files</EmptyTitle>
                <EmptyDescription>The firm will add documents here when they are ready to share.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : links.map((file) => (
            <div key={file.id}>
              {file.url ? <Button nativeButton={false} render={<a href={file.url} />} variant="link">{file.name}</Button> : <span className="text-sm">{file.name}</span>}
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="grid gap-4">
        {(invoices || []).map((invoice) => (
          <Card key={invoice.id}>
            <CardHeader>
              <CardTitle>{invoice.title}</CardTitle>
              <CardDescription>{(invoice.amount_cents / 100).toFixed(2)} {invoice.currency.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Badge variant="secondary">{invoice.status}</Badge>
              <Progress value={invoice.status === "paid" ? 100 : invoice.status === "open" ? 66 : 20} />
              {invoice.status === "open" && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
                <form action={payInvoice}>
                  <input type="hidden" name="invoice_id" value={invoice.id} />
                  <Button type="submit">Pay</Button>
                </form>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </PortalShell>
  );
}

async function payInvoice(formData: FormData) {
  "use server";
  const { redirect } = await import("next/navigation");
  const { requireClient } = await import("@/lib/data");
  const { createAdminClient } = await import("@/lib/supabase/admin");
  const { organizationId } = await requireClient();
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) redirect("/portal");
  const admin = createAdminClient();
  const id = String(formData.get("invoice_id"));
  const { data: invoice } = await admin!.from("invoices").select("*").eq("id", id).eq("organization_id", organizationId).single();
  if (!invoice || invoice.status !== "open") redirect("/portal");
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeKey!);
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ quantity: 1, price_data: { currency: invoice.currency, unit_amount: invoice.amount_cents, product_data: { name: invoice.title } } }],
    success_url: `${site}/portal?paid=1`,
    cancel_url: `${site}/portal/projects/${invoice.project_id || ""}`,
    metadata: { invoice_id: invoice.id },
  });
  await admin!.from("invoices").update({ stripe_session_id: session.id }).eq("id", invoice.id);
  if (session.url) redirect(session.url);
  redirect("/portal");
}
