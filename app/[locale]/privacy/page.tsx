import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { firm } from "@/content/site";

export const metadata: Metadata = { title: "Privacy" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy"
      summary={[
        "The contact form stores your name, email, organization, and message so staff can reply.",
        "The newsletter stores an email address only.",
        "Chat questions are not kept as a transcript.",
        "Client portal records are visible to that organization and to staff.",
      ]}
    >
      <h2 className="font-serif text-2xl text-[#14382c]">Public site</h2>
      <p>If you use the contact form, the firm keeps the fields you submit in its database. A hidden field is used to reject automated submissions and is not a marketing profile. The footer newsletter stores the email you enter so the firm can send updates if that list is used.</p>
      <p>The assistant on the public site answers from published pages. Questions are rate-limited and are not stored as a conversation history.</p>
      <h2 className="font-serif text-2xl text-[#14382c]">Accounts</h2>
      <p>Staff and invited clients sign in with an account. Client portal accounts hold project files and invoices for the organization you belong to. Staff can read those records. Other clients cannot.</p>
      <h2 className="font-serif text-2xl text-[#14382c]">What this site does not do</h2>
      <p>The public site does not use advertising cookies and does not sell contact details. Indicator figures shown on the site are either World Bank series or firm illustrations. They are not a personal profile.</p>
      <p>Write to {firm.email} to ask what we hold about you or to ask for a correction. Phone and street details on the site are placeholders until the firm confirms them.</p>
    </LegalPage>
  );
}
