import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type Indicator = {
  id: string;
  label: string;
  value: string;
  period: string;
  trend: string;
  icon: string;
  sort: number;
  source: "live" | "manual";
  series_code: string | null;
  override_value: string | null;
  as_of: string | null;
};

export type Insight = {
  id: string;
  title: string;
  slug: string;
  published_on: string;
  excerpt: string;
  body: string;
  cover_path: string | null;
  published: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_path: string | null;
  sort: number;
  published: boolean;
};

const fallbackIndicators: Indicator[] = [
  { id: "1", label: "GDP Growth", value: "3.2%", period: "2024", trend: "up", icon: "chart", sort: 1, source: "live", series_code: "NY.GDP.MKTP.KD.ZG", override_value: null, as_of: null },
  { id: "2", label: "Inflation", value: "3.5%", period: "2024", trend: "up", icon: "chart", sort: 2, source: "live", series_code: "FP.CPI.TOTL.ZG", override_value: null, as_of: null },
  { id: "3", label: "Investment", value: "4.8%", period: "2024", trend: "up", icon: "briefcase", sort: 3, source: "manual", series_code: null, override_value: null, as_of: null },
  { id: "4", label: "Employment", value: "65.1%", period: "2024", trend: "flat", icon: "users", sort: 4, source: "manual", series_code: null, override_value: null, as_of: null },
  { id: "5", label: "Trade Growth", value: "2.7%", period: "Global", trend: "up", icon: "globe", sort: 5, source: "live", series_code: "NE.EXP.GNFS.KD.ZG", override_value: null, as_of: null },
  { id: "6", label: "Climate Risk", value: "Medium", period: "Global", trend: "flat", icon: "leaf", sort: 6, source: "manual", series_code: null, override_value: null, as_of: null },
  { id: "7", label: "Biodiversity", value: "Stable", period: "Global", trend: "flat", icon: "leaf", sort: 7, source: "manual", series_code: null, override_value: null, as_of: null },
  { id: "8", label: "SDG Progress", value: "72/100", period: "", trend: "up", icon: "sdg", sort: 8, source: "manual", series_code: null, override_value: null, as_of: null },
];

const fallbackInsights: Insight[] = [
  {
    id: "a",
    title: "Financing Nature: Innovative Solutions for Biodiversity Conservation",
    slug: "financing-nature",
    published_on: "2025-05-15",
    excerpt: "How nature finance can fund conservation without separating it from livelihoods.",
    body: "Biodiversity conservation needs capital that respects local stewardship.",
    cover_path: "/infographics/insight-nature.webp",
    published: true,
  },
  {
    id: "b",
    title: "Inclusive Green Growth: Pathways for Developing Economies",
    slug: "inclusive-green-growth",
    published_on: "2025-04-28",
    excerpt: "Pathways that keep jobs, equity, and environmental limits in the same decision.",
    body: "Economic transformation changes employment and livelihoods.",
    cover_path: "/infographics/insight-terraces.webp",
    published: true,
  },
  {
    id: "c",
    title: "Policy Coherence for a Just and Resilient Transition",
    slug: "policy-coherence",
    published_on: "2025-04-10",
    excerpt: "Aligning climate, social, and economic policy so the transition is workable.",
    body: "A just transition fails when policies point in different directions.",
    cover_path: "/infographics/insight-energy.webp",
    published: true,
  },
];

export function displayValue(indicator: Indicator) {
  return indicator.override_value || indicator.value;
}

async function read<T>(query: PromiseLike<{ data: T[] | null; error: { message: string } | null }>, fallback: T[]) {
  try {
    const { data, error } = await query;
    if (error || !data?.length) return fallback;
    return data;
  } catch {
    return fallback;
  }
}

export async function getIndicators() {
  const supabase = await createClient();
  return read<Indicator>(
    supabase.from("indicators").select("*").order("sort"),
    fallbackIndicators
  );
}

export async function getPublishedInsights() {
  const supabase = await createClient();
  return read<Insight>(
    supabase.from("insights").select("*").eq("published", true).order("published_on", { ascending: false }),
    fallbackInsights
  );
}

export async function getInsight(slug: string) {
  const supabase = await createClient();
  try {
    const { data } = await supabase.from("insights").select("*").eq("slug", slug).eq("published", true).maybeSingle();
    if (data) return data as Insight;
  } catch {
    // fall through
  }
  return fallbackInsights.find((item) => item.slug === slug) ?? null;
}

export async function getTeam() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("team_members").select("*").eq("published", true).order("sort");
    if (error || !data) return [] as TeamMember[];
    return data as TeamMember[];
  } catch {
    return [] as TeamMember[];
  }
}

export async function requireStaff() {
  const { redirect } = await import("next/navigation");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const staff = user!;
  const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", staff.id).maybeSingle();
  if (profile?.role !== "staff") redirect("/admin/login");
  return staff;
}

export async function requireClient() {
  const { redirect } = await import("next/navigation");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");
  const client = user!;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, organization_id")
    .eq("user_id", client.id)
    .maybeSingle();
  if (!profile || profile.role !== "client" || !profile.organization_id) redirect("/portal/login");
  return { user: client, organizationId: profile!.organization_id as string };
}

export function publicAssetUrl(path: string | null) {
  if (!path) return null;
  if (path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/${path}`;
}

export async function allowRate(bucket: string, key: string, windowMs: number) {
  const admin = createAdminClient();
  if (!admin) return true;
  const since = new Date(Date.now() - windowMs).toISOString();
  const { count } = await admin
    .from("rate_limits")
    .select("id", { count: "exact", head: true })
    .eq("bucket", bucket)
    .eq("key", key)
    .gte("created_at", since);
  if ((count ?? 0) > 0) return false;
  await admin.from("rate_limits").insert({ bucket, key });
  return true;
}
