import { notFound } from "next/navigation";
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
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl text-[#14382c]">{project.name}</h1>
      <p className="mt-3">{project.summary}</p>
      <h2 className="mt-8 font-serif text-2xl">Files</h2>
      <ul className="mt-3 space-y-2">
        {links.map((file) => (
          <li key={file.id}>{file.url ? <a className="underline" href={file.url}>{file.name}</a> : file.name}</li>
        ))}
      </ul>
      <h2 className="mt-8 font-serif text-2xl">Invoices</h2>
      <ul className="mt-3 space-y-3">
        {(invoices || []).map((invoice) => (
          <li key={invoice.id} className="rounded-xl border bg-white p-4">
            <p>{invoice.title} · {(invoice.amount_cents / 100).toFixed(2)} {invoice.currency.toUpperCase()} · {invoice.status}</p>
            {invoice.status === "open" && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
              <form action={payInvoice}>
                <input type="hidden" name="invoice_id" value={invoice.id} />
                <button className="mt-2 rounded-full bg-[#e36b1e] px-4 py-2 text-sm text-white" type="submit">Pay</button>
              </form>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
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
