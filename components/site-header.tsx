"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import { companyLinks, firm, mega } from "@/content/site";
import { loc } from "@/lib/paths";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const columns = [
  { key: "firm", title: "Firm", items: mega.firm },
  { key: "services", title: "Services", items: mega.services },
  { key: "insights", title: "Insights", items: mega.insights },
  { key: "legal", title: "Legal", items: mega.legal },
] as const;

function MegaPanel({ locale }: { locale: string }) {
  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 lg:w-[920px] lg:grid-cols-4">
      {columns.map((column) => (
        <div key={column.key}>
          <p className="mb-2 text-xs font-semibold tracking-wide text-[#6b7c74] uppercase">{column.title}</p>
          <ul className="space-y-1">
            {column.items.map((item) => (
              <li key={item.href}>
                <NavigationMenuLink href={loc(locale, item.href)} className="block rounded-md px-2 py-1.5 text-sm text-[#14382c] hover:bg-[#f3eee4]">
                  {item.label}
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function SiteHeader({ locale, labels }: { locale: string; labels: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[#e6e0d4] bg-[#f6f3ec]/95 backdrop-blur">
      <div className="mx-auto hidden max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:flex">
        <Link href={loc(locale, "/")} className="shrink-0">
          <img src="/brand/lockup.svg" alt="Eco Policy Nexus International" className="h-16 w-auto" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className="text-right leading-tight text-[#14382c]">
            A Bhutanese Firm,
            <br />
            <span className="text-[#e36b1e]">Serving the World</span>
          </p>
          <a href={firm.linkedin} aria-label="LinkedIn" className="text-sm font-semibold text-[#14382c]">in</a>
          <a href={firm.x} aria-label="X" className="text-[#14382c]">𝕏</a>
          <a href={`mailto:${firm.email}`} aria-label="Email" className="text-[#14382c]"><Mail className="size-4" /></a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:justify-start">
        <Link href={loc(locale, "/")} className="lg:hidden">
          <img src="/brand/lockup.svg" alt="Eco Policy Nexus International" className="h-12 w-auto" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <Button nativeButton={false} render={<Link href={loc(locale, "/")} />} className="bg-[#e36b1e] text-white hover:bg-[#cf5c12]">
            {labels.home}
          </Button>
          <NavigationMenu>
            <NavigationMenuList>
              {columns.slice(0, 3).map((column) => (
                <NavigationMenuItem key={column.key}>
                  <NavigationMenuTrigger>{column.title === "Firm" ? labels.firm : column.title === "Services" ? labels.services : labels.insights}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <MegaPanel locale={locale} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button nativeButton={false} render={<Link href={loc(locale, "/contact")} />} variant="ghost">
            {labels.contact}
          </Button>
          <Button nativeButton={false} render={<Link href={loc(locale, "/core-values")} />} className="bg-[#14382c] text-[#f6f3ec] hover:bg-[#0f2b22]">
            {labels.values}
          </Button>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label={labels.menu} />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm overflow-y-auto bg-[#f6f3ec]">
            <SheetTitle className="font-serif text-[#14382c]">Eco Policy Nexus</SheetTitle>
            <div className="mt-4 flex flex-col gap-2">
              <Button nativeButton={false} render={<Link href={loc(locale, "/")} onClick={() => setOpen(false)} />} className="bg-[#e36b1e] text-white">{labels.home}</Button>
              <Button nativeButton={false} render={<Link href={loc(locale, "/contact")} onClick={() => setOpen(false)} />} variant="outline">{labels.contact}</Button>
              <Button nativeButton={false} render={<Link href={loc(locale, "/core-values")} onClick={() => setOpen(false)} />} className="bg-[#14382c] text-[#f6f3ec]">{labels.values}</Button>
            </div>
            <Accordion className="mt-4">
              {columns.map((column) => (
                <AccordionItem key={column.key} value={column.key}>
                  <AccordionTrigger>{column.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pb-2">
                      {column.items.map((item) => (
                        <li key={item.href}>
                          <Link href={loc(locale, item.href)} onClick={() => setOpen(false)} className="text-sm text-[#14382c]">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <button type="button" className="sr-only" onClick={() => setOpen(false)}>
              <X />
            </button>
          </SheetContent>
        </Sheet>
      </div>
      <p className="sr-only">{companyLinks.length} company links are in the footer.</p>
    </header>
  );
}
