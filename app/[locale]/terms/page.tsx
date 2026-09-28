import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return (
    <LegalPage
      title="Terms"
      summary={[
        "Public pages describe the firm. They are not a contract or a formal opinion.",
        "Dashboard figures are not official government statistics.",
        "The assistant is not professional advice.",
      ]}
    >
      <h2 className="font-serif text-2xl text-[#14382c]">Public pages</h2>
      <p>Pages about the firm, its services, values, team, and insights explain how Eco Policy Nexus International works. Publishing them is not an offer of employment, a promise of results, or an agreement to take on an assignment. An assignment starts only when the firm and the client agree a scope.</p>
      <h2 className="font-serif text-2xl text-[#14382c]">Numbers and commentary</h2>
      <p>Indicator figures may come from the World Bank or from staff edits. Investment, employment, climate, biodiversity, and the SDG tile include firm illustrations. They are not official statistics of the Royal Government of Bhutan. Insights are firm commentary and do not score a government&apos;s current policies.</p>
      <h2 className="font-serif text-2xl text-[#14382c]">Assistant and payments</h2>
      <p>The assistant answers from public site copy only. It is not professional advice. Invoices in the client portal are payable only through the checkout link staff open for that organization.</p>
    </LegalPage>
  );
}
