"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/lib/data";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}

export async function saveInsight(formData: FormData) {
  await requireStaff();
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const slug = slugify(String(formData.get("slug") || title));
  const file = formData.get("cover");
  let cover_path = String(formData.get("cover_path") || "") || null;
  if (file instanceof File && file.size > 0) {
    const path = `${slug}-${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("insights").upload(path, file, { upsert: true });
    if (!error) cover_path = `insights/${path}`;
  }
  const row = {
    title,
    slug,
    excerpt: String(formData.get("excerpt") || ""),
    body: String(formData.get("body") || ""),
    published_on: String(formData.get("published_on") || new Date().toISOString().slice(0, 10)),
    published: formData.get("published") === "on",
    cover_path,
  };
  if (id) await supabase.from("insights").update(row).eq("id", id);
  else await supabase.from("insights").insert(row);
  revalidatePath("/en");
  redirect("/admin/insights");
}

export async function deleteInsight(formData: FormData) {
  await requireStaff();
  const supabase = await createClient();
  await supabase.from("insights").delete().eq("id", String(formData.get("id")));
  revalidatePath("/en");
  redirect("/admin/insights");
}

export async function saveIndicator(formData: FormData) {
  await requireStaff();
  const supabase = await createClient();
  const override = String(formData.get("override_value") || "").trim();
  await supabase.from("indicators").update({
    label: String(formData.get("label") || ""),
    value: String(formData.get("value") || ""),
    period: String(formData.get("period") || ""),
    override_value: override || null,
  }).eq("id", String(formData.get("id")));
  revalidatePath("/en/indicators");
  redirect("/admin/indicators");
}

export async function saveTeam(formData: FormData) {
  await requireStaff();
  const supabase = await createClient();
  const name = String(formData.get("name") || "").trim();
  const file = formData.get("photo");
  let photo_path: string | null = null;
  if (file instanceof File && file.size > 0) {
    const path = `${Date.now()}-${file.name.replace(/[^\w.]+/g, "")}`;
    const { error } = await supabase.storage.from("team").upload(path, file);
    if (!error) photo_path = `team/${path}`;
  }
  await supabase.from("team_members").insert({
    name,
    role: String(formData.get("role") || ""),
    bio: String(formData.get("bio") || ""),
    sort: Number(formData.get("sort") || 0),
    published: formData.get("published") === "on",
    photo_path,
  });
  redirect("/admin/team");
}

export async function createOrganization(formData: FormData) {
  await requireStaff();
  const admin = createAdminClient();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = Math.random().toString(36).slice(2) + "A1!";
  if (!admin || !name || !email) redirect("/admin/organizations?error=1");
  const { data: org } = await admin.from("organizations").insert({ name }).select("id").single();
  const { data: user, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error || !user.user || !org) redirect("/admin/organizations?error=1");
  await admin.from("profiles").insert({ user_id: user.user.id, role: "client", organization_id: org.id, email });
  redirect(`/admin/organizations?created=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
}

export async function createProject(formData: FormData) {
  await requireStaff();
  const supabase = await createClient();
  await supabase.from("projects").insert({
    organization_id: String(formData.get("organization_id")),
    name: String(formData.get("name") || ""),
    summary: String(formData.get("summary") || ""),
  });
  redirect("/admin/projects");
}

export async function uploadProjectFile(formData: FormData) {
  await requireStaff();
  const supabase = await createClient();
  const file = formData.get("file");
  const projectId = String(formData.get("project_id"));
  const { data: project } = await supabase.from("projects").select("organization_id").eq("id", projectId).single();
  const organizationId = project?.organization_id as string | undefined;
  if (!(file instanceof File) || file.size === 0 || !organizationId) redirect("/admin/projects");
  const path = `${organizationId}/${projectId}/${Date.now()}-${file.name.replace(/[^\w.]+/g, "")}`;
  const { error } = await supabase.storage.from("project-files").upload(path, file);
  if (!error) {
    await supabase.from("project_files").insert({
      organization_id: organizationId,
      project_id: projectId,
      name: file.name,
      storage_path: path,
    });
  }
  redirect("/admin/projects");
}

export async function createInvoice(formData: FormData) {
  await requireStaff();
  const admin = createAdminClient();
  if (!admin) redirect("/admin/invoices");
  const amount = Math.round(Number(formData.get("amount") || 0) * 100);
  const { data: invoice } = await admin.from("invoices").insert({
    organization_id: String(formData.get("organization_id")),
    project_id: String(formData.get("project_id") || "") || null,
    title: String(formData.get("title") || "Invoice"),
    amount_cents: amount,
    currency: "usd",
    status: process.env.STRIPE_SECRET_KEY ? "open" : "draft",
  }).select("id").single();
  if (!invoice) redirect("/admin/invoices?error=1");
  if (!process.env.STRIPE_SECRET_KEY) redirect("/admin/invoices?draft=1");
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: amount,
        product_data: { name: String(formData.get("title") || "Invoice") },
      },
    }],
    success_url: `${site}/portal?paid=1`,
    cancel_url: `${site}/portal`,
    metadata: { invoice_id: invoice.id },
  });
  await admin.from("invoices").update({ stripe_session_id: session.id }).eq("id", invoice.id);
  if (session.url) redirect(session.url);
  redirect("/admin/invoices");
}
