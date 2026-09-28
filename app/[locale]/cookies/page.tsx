import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Cookie policy" };

export default function Page() {
  return (
    <LegalPage title="Cookie policy">
      <p>Sign-in uses cookies so staff and invited clients stay signed in. Those cookies are required for the admin and portal areas.</p>
      <p>The public site does not set advertising or analytics cookies. Stripe may set cookies on its own checkout pages when a client pays an invoice.</p>
    </LegalPage>
  );
}
