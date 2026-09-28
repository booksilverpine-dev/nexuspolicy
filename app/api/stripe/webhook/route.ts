import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!secret || !key) return new Response("Stripe is not configured", { status: 400 });
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(key);
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });
  const payload = await request.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }
  const admin = createAdminClient();
  if (!admin) return new Response("Unavailable", { status: 500 });
  const { error } = await admin.from("stripe_events").insert({ id: event.id });
  if (error) return new Response("ok");
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const invoiceId = session.metadata?.invoice_id;
    if (invoiceId) {
      await admin.from("invoices").update({
        status: "paid",
        stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
      }).eq("id", invoiceId);
    }
  }
  return new Response("ok");
}
