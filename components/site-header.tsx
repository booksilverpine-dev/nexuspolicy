"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Mail, Menu, X } from "lucide-react";
import { firm, mega, services } from "@/content/site";
import { loc } from "@/lib/paths";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type MenuKey = "firm" | "services" | "insights";

const columns = [
  { key: "firm", title: "Firm", items: mega.firm },
  { key: "services", title: "Services", items: mega.services },
  { key: "insights", title: "Insights", items: mega.insights },
  { key: "legal", title: "Legal", items: mega.legal },
] as const;

const insightNotes: Record<string, string> = {
  "/insights": "Research and commentary from the firm.",
  "/indicators": "Bhutan GDP growth, inflation, and trade.",
  "/insights/financing-nature": "How nature finance can fund conservation and livelihoods.",
  "/insights/inclusive-green-growth": "Growth that includes people and protects the environment.",
  "/insights/policy-coherence": "Aligning economic, climate, and social policy.",
};

const firmNotes: Record<string, string> = {
  "/about": "A Bhutanese advisory firm working with the world.",
  "/about#vision": "Trusted knowledge, regional relevance, global reach.",
  "/about#story": "Economic progress alongside environmental responsibility.",
  "/team": "The people behind the advice.",
  "/core-values": "Integrity, inclusivity, sustainability, partnership.",
};

function MegaLink({ locale, href, label, note }: { locale: string; href: string; label: string; note?: string }) {
  return (
    <Link href={loc(locale, href)} className="block rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-[#e6e0d4] transition hover:ring-[#14382c]">
      <span className="block font-serif text-xl leading-snug text-[#14382c]">{label}</span>
      {note ? <span className="mt-1.5 block text-base leading-6 text-[#3d5248]">{note}</span> : null}
    </Link>
  );
}

function FeatureCard({
  locale,
  href,
  image,
  alt,
  eyebrow,
  title,
  text,
}: {
  locale: string;
  href: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <Card className="h-full overflow-hidden p-0">
      <Link href={loc(locale, href)} className="flex h-full flex-col">
        <img src={image} alt={alt} className="h-52 w-full object-cover" />
        <CardHeader className="gap-2 px-5 pt-5">
          <CardDescription className="text-sm font-semibold tracking-wide text-[#e36b1e] uppercase">{eyebrow}</CardDescription>
          <CardTitle className="font-serif text-2xl leading-tight text-[#14382c]">{title}</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <p className="text-base leading-7 text-[#3d5248]">{text}</p>
        </CardContent>
      </Link>
    </Card>
  );
}

function MegaPanel({ locale, menu }: { locale: string; menu: MenuKey }) {
  return (
    <div className="absolute inset-x-0 top-full z-50 border-t border-[#e6e0d4] bg-[#f6f3ec] shadow-[0_18px_40px_rgba(20,56,44,0.12)]">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        {menu === "firm" ? (
          <div>
            <p className="px-1 font-serif text-lg text-[#14382c]">The firm</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {mega.firm.map((item) => (
                <li key={item.href}>
                  <MegaLink locale={locale} href={item.href} label={item.label} note={firmNotes[item.href]} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {menu === "services" ? (
          <div>
            <p className="px-1 font-serif text-lg text-[#14382c]">Practice areas</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <MegaLink locale={locale} href={`/services/${service.slug}`} label={service.title} note={service.summary} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {menu === "insights" ? (
          <div>
            <p className="px-1 font-serif text-lg text-[#14382c]">Research</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {mega.insights.map((item) => (
                <li key={item.href}>
                  <MegaLink locale={locale} href={item.href} label={item.label} note={insightNotes[item.href]} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {menu === "firm" ? (
          <FeatureCard locale={locale} href="/about" image="/infographics/work-firm.png" alt="Two advisers discussing evidence at a table" eyebrow="About the firm" title="Rooted in Bhutan. Engaged with the world." text={firm.description} />
        ) : null}
        {menu === "services" ? (
          <FeatureCard locale={locale} href="/services" image="/infographics/work-services.png" alt="A workshop combining data, climate, and people" eyebrow="All services" title="Five practices, one advisory firm." text="Economics, climate, inclusion, delivery, and partnerships." />
        ) : null}
        {menu === "insights" ? (
          <FeatureCard locale={locale} href="/insights" image="/infographics/work-insights.png" alt="Research notes and charts on a desk" eyebrow="Latest thinking" title="From evidence to decisions." text="Financing nature, inclusive green growth, and policy coherence." />
        ) : null}
      </div>
    </div>
  );
}

export function SiteHeader({ locale, labels }: { locale: string; labels: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  return (
    <header
      className="sticky top-0 z-40 border-b border-[#e6e0d4] bg-[#f6f3ec]/95 backdrop-blur"
      onMouseLeave={() => setMenu(null)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setMenu(null);
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link href={loc(locale, "/")} className="shrink-0">
            <img src="/brand/lockup.svg" alt="Eco Policy Nexus International" className="h-12 w-auto lg:h-14" />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <Button nativeButton={false} render={<Link href={loc(locale, "/")} />} className="bg-[#e36b1e] text-white hover:bg-[#cf5c12]">
              {labels.home}
            </Button>
            {(["firm", "services", "insights"] as const).map((key) => (
              <button
                key={key}
                type="button"
                className="inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm font-medium text-[#14382c] hover:bg-[#f3eee4]"
                aria-expanded={menu === key}
                onMouseEnter={() => setMenu(key)}
                onFocus={() => setMenu(key)}
                onClick={() => setMenu((current) => (current === key ? null : key))}
              >
                {labels[key]}
                <ChevronDown className={`size-3.5 transition ${menu === key ? "rotate-180" : ""}`} aria-hidden />
              </button>
            ))}
            <Button nativeButton={false} render={<Link href={loc(locale, "/contact")} />} variant="ghost">
              {labels.contact}
            </Button>
            <Button nativeButton={false} render={<Link href={loc(locale, "/core-values")} />} className="bg-[#14382c] text-[#f6f3ec] hover:bg-[#0f2b22]">
              {labels.values}
            </Button>
          </nav>
        </div>
        <div className="hidden items-center gap-4 text-sm lg:flex">
          <p className="text-right leading-tight text-[#14382c]">
            A Bhutanese Firm,
            <br />
            <span className="text-[#e36b1e]">Serving the World</span>
          </p>
          <a href={firm.linkedin} aria-label="LinkedIn" className="text-sm font-semibold text-[#14382c]">in</a>
          <a href={firm.x} aria-label="X" className="text-[#14382c]">𝕏</a>
          <a href={`mailto:${firm.email}`} aria-label="Email" className="text-[#14382c]"><Mail className="size-4" /></a>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label={labels.menu} />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" showCloseButton={false} className="w-full gap-0 overflow-hidden bg-[#f6f3ec] p-0 sm:max-w-[22rem]">
            <div className="flex items-center justify-between border-b border-[#e6e0d4] px-4 py-3">
              <SheetTitle className="font-serif text-lg text-[#14382c]">Eco Policy Nexus</SheetTitle>
              <SheetClose render={<Button variant="ghost" size="icon" aria-label="Close menu" />}>
                <X />
              </SheetClose>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                <Button nativeButton={false} render={<Link href={loc(locale, "/")} onClick={() => setOpen(false)} />} className="bg-[#e36b1e] text-white">{labels.home}</Button>
                <Button nativeButton={false} render={<Link href={loc(locale, "/contact")} onClick={() => setOpen(false)} />} variant="outline">{labels.contact}</Button>
                <Button nativeButton={false} render={<Link href={loc(locale, "/core-values")} onClick={() => setOpen(false)} />} className="bg-[#14382c] text-[#f6f3ec]">{labels.values}</Button>
              </div>
              <Accordion className="border-t border-[#e6e0d4]">
                {columns.map((column) => (
                  <AccordionItem key={column.key} value={column.key} className="border-b border-[#e6e0d4]">
                    <AccordionTrigger className="py-3 text-base text-[#14382c] hover:no-underline">{column.title}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pb-3">
                        {column.items.map((item) => (
                          <li key={item.href}>
                            <Link href={loc(locale, item.href)} onClick={() => setOpen(false)} className="block rounded-md px-2 py-2 text-base text-[#14382c] hover:bg-[#f3eee4]">
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {menu ? <MegaPanel locale={locale} menu={menu} /> : null}
    </header>
  );
}
