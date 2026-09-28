import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Cookie policy" };

export default function Page() {
  return (
    <LegalPage
      title="Cookie policy"
      summary={[
        "Public reading does not require an advertising or analytics cookie.",
        "Sign-in cookies keep staff and invited clients authenticated.",
        "Stripe may set cookies on its own checkout pages.",
      ]}
    >
      <h2 className="font-serif text-2xl text-[#14382c]">Necessary sign-in</h2>
      <p>Sign-in uses cookies so staff and invited clients stay signed in. Those cookies are required for the admin and portal areas. Closing the session from the sign-out control ends that use.</p>
      <h2 className="font-serif text-2xl text-[#14382c]">Public pages</h2>
      <p>Reading the public site, sending the contact form, or using the assistant does not set an advertising or analytics cookie from this firm. Language is chosen in the address, /en or /dz, not by a tracking cookie.</p>
      <h2 className="font-serif text-2xl text-[#14382c]">Payments</h2>
      <p>Stripe may set cookies on its own checkout pages when a client pays an invoice. Those pages are operated by Stripe under its own terms.</p>
    </LegalPage>
  );
}
