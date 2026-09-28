import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const header = request.headers.get("authorization");
  if (!secret || header !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  const admin = createAdminClient();
  if (!admin) return Response.json({ ok: false });
  const { data: rows } = await admin.from("indicators").select("id, series_code, source").eq("source", "live");
  for (const row of rows || []) {
    if (!row.series_code) continue;
    try {
      const response = await fetch(`https://api.worldbank.org/v2/country/BT/indicator/${row.series_code}?format=json&mrnev=1`);
      if (!response.ok) throw new Error(String(response.status));
      const json = await response.json();
      const point = json?.[1]?.[0];
      if (!point || point.value == null) throw new Error("empty");
      await admin.from("indicators").update({
        value: `${Number(point.value).toFixed(1)}%`,
        as_of: point.date ? `${point.date}-01-01` : new Date().toISOString().slice(0, 10),
      }).eq("id", row.id);
    } catch (error) {
      console.error("World Bank refresh failed", row.series_code, error instanceof Error ? error.message : "error");
    }
  }
  return Response.json({ ok: true });
}
