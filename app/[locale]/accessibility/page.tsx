import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { firm } from "@/content/site";

export const metadata: Metadata = { title: "Accessibility" };

export default function Page() {
  return (
    <LegalPage title="Accessibility">
      <p>Pages use text alongside icons and charts, visible focus, and labeled form fields. The language switch is in the address: /en for English and /dz for Dzongkha.</p>
      <p>If a page blocks you, email {firm.email} and name the page and what failed.</p>
    </LegalPage>
  );
}
