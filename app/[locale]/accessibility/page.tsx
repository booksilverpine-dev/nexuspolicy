import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { firm } from "@/content/site";

export const metadata: Metadata = { title: "Accessibility" };

export default function Page() {
  return (
    <LegalPage
      title="Accessibility"
      summary={[
        "Charts and icons are paired with text.",
        "Forms use visible labels.",
        "English is at /en and Dzongkha chrome is at /dz.",
      ]}
    >
      <h2 className="font-serif text-2xl text-[#14382c]">How pages are built</h2>
      <p>Pages use text alongside icons and charts, visible focus, and labeled form fields. Infographics repeat their meaning in headings and sentences, so a diagram is not the only way to get the point. The language switch is in the address: /en for English and /dz for Dzongkha. Long-form page copy is currently published in English.</p>
      <h2 className="font-serif text-2xl text-[#14382c]">Known limits</h2>
      <p>Some illustrations are decorative and marked so assistive technology can skip them. The world map is supplemented by a written list of regions. If a live indicator fails to load, the page shows the firm&apos;s stored figure and says how that figure was produced.</p>
      <h2 className="font-serif text-2xl text-[#14382c]">Ask for a fix</h2>
      <p>If a page blocks you, email {firm.email} and name the page and what failed. Include the browser or assistive technology you used if you can.</p>
    </LegalPage>
  );
}
