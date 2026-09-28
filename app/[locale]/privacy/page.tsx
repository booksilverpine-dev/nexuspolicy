import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { firm } from "@/content/site";

export const metadata: Metadata = { title: "Privacy" };

export default function Page() {
  return (
    <LegalPage title="Privacy">
      <p>The public contact form and newsletter field store your name, email, organization, and message in Supabase so staff can reply. Chat questions are not stored as a transcript.</p>
      <p>Client portal accounts hold project files and invoices for the organization you belong to. Staff can read those records. Other clients cannot.</p>
      <p>The site does not use advertising cookies. Write to {firm.email} to ask what we hold about you.</p>
    </LegalPage>
  );
}
