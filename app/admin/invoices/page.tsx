import { AdminShell } from "@/components/admin-shell";
import { requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { createInvoice } from "../actions";

export default async function InvoicesAdmin({ searchParams }: { searchParams: Promise<{ draft?: string }> }) {
  await requireStaff();
  const query = await searchParams;
  const supabase = await createClient();
  const { data: orgs } = await supabase.from("organizations").select("id, name");
  const { data: projects } = await supabase.from("projects").select("id, name");
  const { data: invoices } = await supabase.from("invoices").select("id, title, status, amount_cents, currency");
  const stripeReady = Boolean(process.env.STRIPE_SECRET_KEY);
  return (
    <AdminShell title="Invoices">
      {query.draft ? <p className="mb-4 text-sm">Saved as a draft. Add Stripe keys before a client can pay.</p> : null}
      <ul className="space-y-1 text-sm">{(invoices || []).map((invoice) => <li key={invoice.id}>{invoice.title} · {(invoice.amount_cents / 100).toFixed(2)} {invoice.currency} · {invoice.status}</li>)}</ul>
      {stripeReady ? (
        <form action={createInvoice} className="mt-6 grid max-w-md gap-3">
          <select name="organization_id" className="h-10 rounded-md border px-3" required>
            {(orgs || []).map((org) => <option key={org.id} value={org.id}>{org.name}</option>)}
          </select>
          <select name="project_id" className="h-10 rounded-md border px-3">
            <option value="">No project</option>
            {(projects || []).map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
          </select>
          <input name="title" required placeholder="Invoice title" className="h-10 rounded-md border px-3" />
          <input name="amount" type="number" min="0" step="0.01" required placeholder="Amount in USD" className="h-10 rounded-md border px-3" />
          <button className="w-fit rounded-full bg-[#14382c] px-4 py-2 text-white" type="submit">Create and open checkout</button>
        </form>
      ) : <p className="mt-6 text-sm text-[#4d6258]">Invoice creation stays hidden until STRIPE_SECRET_KEY is set.</p>}
    </AdminShell>
  );
}
