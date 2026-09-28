import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { firm } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 lg:grid-cols-2">
      <div>
        <h1 className="font-serif text-4xl text-[#14382c]">Contact</h1>
        <p className="mt-4 text-[#3d5248]">Write to the firm about advisory work, partnerships, or research.</p>
        <ul className="mt-6 space-y-2 text-sm">
          <li>{firm.address}</li>
          <li><a href={firm.phoneHref}>{firm.phone}</a></li>
          <li><a href={`mailto:${firm.email}`}>{firm.email}</a></li>
          <li className="text-[#6b7c74]">{firm.contactNote}</li>
        </ul>
      </div>
      <ContactForm />
    </section>
  );
}
