import Link from "next/link";
import { companyLinks, coreValues, firm, mega, services } from "@/content/site";
import { loc } from "@/lib/paths";
import { subscribeNewsletter } from "@/app/actions";

export function SiteFooter({ locale, subscribeLabel }: { locale: string; subscribeLabel: string }) {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-2xl border border-[#e4ddd0] bg-white p-6 md:p-8">
          <p className="font-serif text-lg text-[#14382c]">{firm.name}</p>
          <p className="mt-2 max-w-xl text-sm text-[#4d6258]">{firm.description}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <FooterColumn title="Services" locale={locale} items={[{ href: "/services", label: "All services" }, ...services.map((item) => ({ href: `/services/${item.slug}`, label: item.title }))]} />
            <FooterColumn title="Firm" locale={locale} items={mega.firm} />
            <FooterColumn title="Insights" locale={locale} items={mega.insights} />
            <FooterColumn title="Company" locale={locale} items={companyLinks} />
            <FooterColumn title="Legal" locale={locale} items={mega.legal} />
          </div>
          <form action={subscribeNewsletter} className="mt-8 flex flex-col gap-3 border-t border-[#eee7dc] pt-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-[#4d6258]">Updates on policy, climate, and partnerships.</p>
            <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
              <label className="sr-only" htmlFor="newsletter-email">Email</label>
              <input id="newsletter-email" name="email" type="email" required placeholder="you@example.com" className="h-10 rounded-full border border-[#d9d1c4] px-4 text-sm md:w-64" />
              <input name="company_website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button className="h-10 rounded-full bg-[#14382c] px-5 text-sm text-white" type="submit">{subscribeLabel}</button>
            </div>
          </form>
          <div className="mt-6 flex flex-col gap-3 border-t border-[#eee7dc] pt-4 text-sm text-[#4d6258] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <a href={firm.linkedin}>LinkedIn</a>
              <a href={firm.x}>X</a>
              <a href={`mailto:${firm.email}`}>Email</a>
            </div>
            <div className="flex gap-4">
              <a href={firm.phoneHref}>{firm.phone}</a>
              <span>{firm.web}</span>
            </div>
          </div>
        </div>
      </div>
      <img src="/infographics/mountains.svg" alt="" className="h-16 w-full bg-[#14382c] object-cover" />
      <div className="bg-[#14382c] px-4 py-6 text-[#f6f3ec]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">{firm.address} · {firm.contactNote}</p>
          <div className="flex items-center gap-3">
            <img src="/brand/mark-on-dark.svg" alt="" className="size-10" />
            <Link href={loc(locale, "/core-values")} className="text-sm">Our Core Values</Link>
          </div>
          <ul className="flex flex-wrap gap-4 text-sm">
            {coreValues.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
        <p className="mx-auto mt-6 max-w-7xl text-xs text-[#d5e0da]">© {new Date().getFullYear()} Eco Policy Nexus International. All rights reserved.</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items, locale }: { title: string; locale: string; items: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-[#6b7c74] uppercase">{title}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={loc(locale, item.href)} className="text-[#14382c] hover:text-[#e36b1e]">{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
