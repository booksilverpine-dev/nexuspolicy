import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return (
    <LegalPage title="Terms">
      <p>Public pages describe Eco Policy Nexus International and its services. They are not a contract, a formal opinion, or an offer of employment.</p>
      <p>Indicator figures may come from the World Bank or from staff edits. They are not official statistics of the Royal Government of Bhutan.</p>
      <p>The assistant answers from public site copy only. It is not professional advice. Invoices in the client portal are payable only through the checkout link staff open for that organization.</p>
    </LegalPage>
  );
}
