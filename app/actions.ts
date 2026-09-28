"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { allowRate } from "@/lib/data";
import { firm } from "@/content/site";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  organization: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(1).max(4000),
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export async function submitContact(_prev: { error?: string; ok?: boolean } | null, formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    organization: formData.get("organization") || "",
    message: formData.get("message"),
    company_website: formData.get("company_website") || "",
  });
  if (!parsed.success || parsed.data.company_website) {
    return { error: "Check the form and try again." };
  }
  const admin = createAdminClient();
  if (!admin) return { error: "Messages cannot be saved right now." };
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await admin
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .eq("email", parsed.data.email)
    .gte("created_at", since);
  if ((count ?? 0) > 0) return { error: "Please wait a few minutes before sending another message." };
  const { error } = await admin.from("contact_messages").insert(parsed.data);
  if (error) return { error: "The message could not be saved." };
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Eco Policy Nexus <onboarding@resend.dev>",
      to: firm.email === "info@ecopolicynexus.com" ? process.env.ADMIN_EMAIL || "booksilverpine@gmail.com" : firm.email,
      subject: `Website message from ${parsed.data.name}`,
      text: `${parsed.data.name} <${parsed.data.email}>\n${parsed.data.organization}\n\n${parsed.data.message}`,
    }).catch((err) => console.error("Resend skipped", err instanceof Error ? err.message : "send failed"));
  } else {
    console.info("Contact saved. Resend is not configured, so no mail was sent.");
  }
  return { ok: true };
}

export async function subscribeNewsletter(formData: FormData) {
  const email = String(formData.get("email") || "");
  const trap = String(formData.get("company_website") || "");
  if (trap || !z.string().email().safeParse(email).success) return;
  const admin = createAdminClient();
  if (!admin) return;
  await admin.from("newsletter_subscribers").upsert({ email }, { onConflict: "email" });
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`${next}/login?error=1`);
  redirect(next);
}

export async function signOut(formData: FormData) {
  const next = String(formData.get("next") || "/admin/login");
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(next);
}
