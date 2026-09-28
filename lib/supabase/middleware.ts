import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest, base?: NextResponse) {
  let response = base ?? NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        if (!base) response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAdmin = path.startsWith("/admin");
  const isPortal = path.startsWith("/portal");
  if (!isAdmin && !isPortal) return response;

  let role: string | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();
    role = data?.role ?? null;
  }

  const redirectTo = (pathname: string) => {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    const redirected = NextResponse.redirect(url);
    response.cookies.getAll().forEach((cookie) => redirected.cookies.set(cookie));
    return redirected;
  };

  if (isAdmin && path !== "/admin/login") {
    if (role !== "staff") return redirectTo("/admin/login");
  }
  if (path === "/admin/login" && role === "staff") return redirectTo("/admin");
  if (isPortal && path !== "/portal/login") {
    if (role !== "client") return redirectTo("/portal/login");
  }
  if (path === "/portal/login" && role === "client") return redirectTo("/portal");
  if (isAdmin && role === "client") return redirectTo("/portal");
  if (isPortal && role === "staff" && path !== "/portal/login") return redirectTo("/admin");

  return response;
}
