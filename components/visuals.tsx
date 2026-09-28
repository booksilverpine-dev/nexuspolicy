import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/site";

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      {kicker ? <p className="text-sm font-semibold tracking-wide text-[#6b7c74]">{kicker}</p> : null}
      <h1 className="mt-2 font-serif text-4xl leading-tight text-[#14382c] md:text-5xl">{title}</h1>
      <div className="mt-4 space-y-3 text-[#3d5248]">{children}</div>
    </header>
  );
}

export function StepRail({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className={`grid gap-3 sm:grid-cols-2 ${steps.length > 4 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      {steps.map((step, index) => (
        <li key={step.title} className="rounded-2xl border border-[#e6e0d4] bg-white p-4">
          <span className="flex size-8 items-center justify-center rounded-full bg-[#14382c] font-serif text-sm text-[#f6f3ec]">{index + 1}</span>
          <h3 className="mt-3 font-serif text-lg text-[#14382c]">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#4d6258]">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function PracticeMap() {
  const accents = ["#e36b1e", "#2f8f4e", "#7a3e9d", "#e39b12", "#2b6cb0"];
  return (
    <figure className="rounded-2xl border border-[#e6e0d4] bg-white p-5">
      <figcaption className="text-xs font-semibold tracking-wide text-[#6b7c74]">FIVE PRACTICES, ONE DECISION</figcaption>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {services.slice(0, 2).map((service, index) => (
          <PracticeNode key={service.slug} title={service.title} summary={service.summary} color={accents[index]} />
        ))}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#14382c] p-5 text-center text-[#f6f3ec]">
          <p className="font-serif text-2xl">Evidence</p>
          <p className="my-2 text-sm text-[#b7e0c4]">becomes a decision</p>
          <p className="font-serif text-2xl">Impact</p>
        </div>
        {services.slice(2).map((service, index) => (
          <PracticeNode key={service.slug} title={service.title} summary={service.summary} color={accents[index + 2]} />
        ))}
      </div>
    </figure>
  );
}

function PracticeNode({ title, summary, color }: { title: string; summary: string; color: string }) {
  return (
    <div className="rounded-2xl border border-[#eee6da] p-4">
      <span className="block h-1.5 w-10 rounded-full" style={{ background: color }} />
      <h3 className="mt-3 font-serif text-lg text-[#14382c]">{title}</h3>
      <p className="mt-2 text-sm text-[#4d6258]">{summary}</p>
    </div>
  );
}

export function PairBridge({ pairs }: { pairs: string[][] }) {
  return (
    <figure>
      <figcaption className="sr-only">The firm connects evidence with policy, strategy with implementation, growth with sustainability, communities with institutions, and Bhutanese experience with international knowledge.</figcaption>
      <ol className="space-y-3">
        {pairs.map(([left, right]) => (
          <li key={left} className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr]">
            <span className="rounded-xl bg-[#14382c] px-4 py-3 text-sm text-[#f6f3ec]">{left}</span>
            <span className="text-center text-xs font-semibold tracking-wide text-[#6b7c74]" aria-hidden>to</span>
            <span className="rounded-xl border border-[#e6e0d4] bg-white px-4 py-3 text-sm text-[#14382c]">{right}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function RegionBoard({ regions }: { regions: { name: string; note: string }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {regions.map((region) => (
        <li key={region.name} className="rounded-2xl border border-[#e6e0d4] bg-white p-4">
          <h3 className="font-serif text-lg text-[#14382c]">{region.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[#4d6258]">{region.note}</p>
        </li>
      ))}
    </ul>
  );
}

export function ValleyScene() {
  return (
    <svg viewBox="0 0 1200 640" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustrated Bhutanese valley with a dzong, river, and prayer flags">
      <rect width="1200" height="640" fill="#d5ebe4" />
      <path d="M0 280 L180 120 L320 230 L470 70 L640 210 L820 90 L980 220 L1200 80 L1200 640 L0 640 Z" fill="#1d4a38" />
      <path d="M0 360 L140 250 L300 340 L460 200 L640 330 L860 210 L1040 340 L1200 240 L1200 640 L0 640 Z" fill="#2f6b52" />
      <path d="M0 470 C200 430 280 520 460 480 C680 430 760 530 980 470 C1080 444 1140 490 1200 460 L1200 640 L0 640 Z" fill="#e7f2ea" />
      <path d="M180 500 C320 470 400 560 560 530 C760 490 820 580 1040 540" fill="none" stroke="#6eafc4" strokeWidth="18" strokeLinecap="round" />
      <g transform="translate(470 360)">
        <rect x="40" y="70" width="160" height="90" fill="#f4efe4" />
        <rect x="20" y="50" width="200" height="24" fill="#c45e18" />
        <rect x="70" y="20" width="100" height="34" fill="#f4efe4" />
        <rect x="58" y="8" width="124" height="16" fill="#c45e18" />
        <rect x="108" y="0" width="16" height="22" fill="#e39b12" />
      </g>
      <g fill="#c45e18">
        <rect x="80" y="300" width="10" height="16" />
        <rect x="96" y="292" width="10" height="16" fill="#2b6cb0" />
        <rect x="112" y="300" width="10" height="16" fill="#e39b12" />
        <rect x="128" y="286" width="10" height="16" fill="#f4efe4" />
        <rect x="144" y="296" width="10" height="16" fill="#7a3e9d" />
      </g>
    </svg>
  );
}

export function ScoreRing({ score, label }: { score: number; label: string }) {
  const turns = Math.max(0, Math.min(100, score)) * 3.6;
  return (
    <div
      className="grid size-28 place-items-center rounded-full"
      style={{ background: `conic-gradient(#2f8f4e ${turns}deg, #e6e0d4 0deg)` }}
      role="img"
      aria-label={`${label}: illustrative ${score} out of 100`}
    >
      <div className="grid size-20 place-items-center rounded-full bg-white text-center">
        <span className="font-serif text-xl text-[#14382c]">{score}</span>
      </div>
    </div>
  );
}

export function StatusScale({ value, stops }: { value: string; stops: string[] }) {
  return (
    <ol className="mt-3 flex gap-1" aria-label={value}>
      {stops.map((stop) => {
        const active = stop.toLowerCase() === value.toLowerCase();
        return (
          <li key={stop} className={`flex-1 rounded-md px-1 py-2 text-center text-xs ${active ? "bg-[#14382c] text-white" : "bg-[#f6f3ec] text-[#6b7c74]"}`}>
            {stop}
          </li>
        );
      })}
    </ol>
  );
}

export function CalloutList({ title, points }: { title: string; points: string[] }) {
  return (
    <aside className="rounded-2xl bg-[#14382c] p-5 text-[#f6f3ec]">
      <h2 className="font-serif text-2xl">{title}</h2>
      <ol className="mt-4 space-y-3">
        {points.map((point, index) => (
          <li key={point} className="flex gap-3 text-sm leading-6">
            <span className="font-serif text-[#e39b12]">{index + 1}</span>
            <span>{point}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-sm font-medium text-[#14382c]">
      {children} <ArrowRight className="size-4" />
    </Link>
  );
}
