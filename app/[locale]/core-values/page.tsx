import type { Metadata } from "next";
import { coreValues } from "@/content/site";

export const metadata: Metadata = { title: "Core values" };

const copy: Record<string, string> = {
  Integrity: "We advise with evidence and say clearly what we know and what we do not.",
  Inclusivity: "People who are affected by a decision belong in the analysis.",
  Sustainability: "Economic progress is weighed with environmental stewardship and social wellbeing.",
  Partnership: "Impact grows when Bhutanese insight works with international collaboration.",
};

export default function CoreValuesPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl text-[#14382c]">Our core values</h1>
      <ul className="mt-8 space-y-4">
        {coreValues.map((value) => (
          <li key={value} className="rounded-2xl border border-[#e6e0d4] bg-white p-5">
            <h2 className="font-serif text-2xl text-[#14382c]">{value}</h2>
            <p className="mt-2">{copy[value]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
