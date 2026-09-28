import Link from "next/link";
import { services } from "@/content/site";
import { loc } from "@/lib/paths";

const accents = ["#e36b1e", "#2f8f4e", "#7a3e9d", "#e39b12", "#2b6cb0"];

export function ServicesVisuals({ locale }: { locale: string }) {
  return (
    <div className="space-y-14">
      <ProblemFlow />
      <section>
        <h2 className="font-serif text-3xl text-[#14382c]">How each practice makes the decision visible</h2>
        <p className="mt-3 max-w-3xl text-[#3d5248]">These diagrams show the shape of the work. The bars and layers are examples of structure, not statistics and not a forecast.</p>
        <ul className="mt-6 grid gap-4 lg:grid-cols-2">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Link href={loc(locale, `/services/${service.slug}`)} className="block h-full rounded-2xl border border-[#e6e0d4] bg-white p-5">
                <p className="text-sm font-semibold" style={{ color: accents[index] }}>0{index + 1}</p>
                <h3 className="mt-1 font-serif text-2xl text-[#14382c]">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4d6258]">{service.summary}</p>
                <div className="mt-4">{charts[service.slug]}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ProblemFlow() {
  return (
    <figure className="rounded-2xl border border-[#e6e0d4] bg-white p-5 md:p-8">
      <figcaption className="font-serif text-2xl text-[#14382c]">The problem is one decision, not three reports</figcaption>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#4d6258]">Growth, climate, and inclusion change the same choice. The firm reads them together, then leaves a brief someone can carry.</p>
      <svg viewBox="0 0 920 280" className="svc-flow mt-6 w-full" role="img" aria-label="Economy, climate, and inclusion flow into one decision brief, then into delivery">
        <FlowNode x={40} y={40} title="Economy" detail="Jobs, prices, revenue" color="#e36b1e" />
        <FlowNode x={40} y={120} title="Climate" detail="Risk, nature, finance" color="#2f8f4e" />
        <FlowNode x={40} y={200} title="Inclusion" detail="Who gains, who is missed" color="#7a3e9d" />
        <path className="svc-draw" d="M250 78 H360" fill="none" stroke="#14382c" strokeWidth="2" />
        <path className="svc-draw svc-delay" d="M250 158 H360" fill="none" stroke="#14382c" strokeWidth="2" />
        <path className="svc-draw svc-delay-2" d="M250 238 H360" fill="none" stroke="#14382c" strokeWidth="2" />
        <rect x="360" y="70" width="200" height="140" rx="16" fill="#14382c" />
        <text x="460" y="125" textAnchor="middle" fill="#f6f3ec" fontSize="22" fontFamily="Georgia, serif">One brief</text>
        <text x="460" y="152" textAnchor="middle" fill="#b7e0c4" fontSize="13" fontFamily="Calibri, sans-serif">sources and caveats</text>
        <text x="460" y="172" textAnchor="middle" fill="#b7e0c4" fontSize="13" fontFamily="Calibri, sans-serif">options and owners</text>
        <path className="svc-draw svc-delay-3" d="M560 140 H680" fill="none" stroke="#14382c" strokeWidth="2" />
        <rect x="680" y="90" width="200" height="100" rx="16" fill="#f6f3ec" stroke="#e6e0d4" />
        <text x="780" y="132" textAnchor="middle" fill="#14382c" fontSize="20" fontFamily="Georgia, serif">Delivery</text>
        <text x="780" y="156" textAnchor="middle" fill="#4d6258" fontSize="13" fontFamily="Calibri, sans-serif">dates, roles, results</text>
      </svg>
    </figure>
  );
}

function FlowNode({ x, y, title, detail, color }: { x: number; y: number; title: string; detail: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width="210" height="64" rx="14" fill="#f6f3ec" />
      <rect x={x} y={y} width="8" height="64" rx="4" fill={color} />
      <text x={x + 24} y={y + 28} fill="#14382c" fontSize="16" fontFamily="Georgia, serif">{title}</text>
      <text x={x + 24} y={y + 48} fill="#4d6258" fontSize="13" fontFamily="Calibri, sans-serif">{detail}</text>
    </g>
  );
}

const charts: Record<string, React.ReactNode> = {
  "economics-data-analytics": <OptionsChart />,
  "environment-climate-change": <RiskLayers />,
  "gender-social-development": <WhoIsMissing />,
  "business-development-project-management": <DeliveryPath />,
  "global-partnership": <PartnershipProduct />,
};

function OptionsChart() {
  const rows = [
    { name: "Option A", jobs: 70, fiscal: 40, climate: 30 },
    { name: "Option B", jobs: 45, fiscal: 75, climate: 55 },
    { name: "Option C", jobs: 55, fiscal: 50, climate: 80 },
  ];
  return (
    <figure>
      <figcaption className="text-xs font-semibold tracking-wide text-[#6b7c74]">OPTIONS COMPARED ON THREE EFFECTS</figcaption>
      <div className="mt-3 space-y-3">
        {rows.map((row) => (
          <div key={row.name} className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
            <span className="text-sm text-[#14382c]">{row.name}</span>
            <div className="flex h-3 overflow-hidden rounded-full bg-[#f6f3ec]">
              <span className="svc-bar h-full bg-[#e36b1e]" style={{ width: `${row.jobs / 3}%` }} />
              <span className="svc-bar svc-delay h-full bg-[#e39b12]" style={{ width: `${row.fiscal / 3}%` }} />
              <span className="svc-bar svc-delay-2 h-full bg-[#2f8f4e]" style={{ width: `${row.climate / 3}%` }} />
            </div>
          </div>
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-3 text-xs text-[#4d6258]">
        <li><i className="mr-1 inline-block size-2 bg-[#e36b1e]" /> Jobs</li>
        <li><i className="mr-1 inline-block size-2 bg-[#e39b12]" /> Fiscal room</li>
        <li><i className="mr-1 inline-block size-2 bg-[#2f8f4e]" /> Climate fit</li>
      </ul>
    </figure>
  );
}

function RiskLayers() {
  const layers = [
    { label: "Hazard", note: "What the climate can do to this place", width: "92%", color: "#14382c" },
    { label: "Exposure", note: "Which assets and households sit in the way", width: "74%", color: "#2f8f4e" },
    { label: "Capacity", note: "What the institution can actually carry", width: "48%", color: "#e39b12" },
  ];
  return (
    <figure>
      <figcaption className="text-xs font-semibold tracking-wide text-[#6b7c74]">A RISK IS THREE LAYERS</figcaption>
      <ul className="mt-3 space-y-2">
        {layers.map((layer, index) => (
          <li key={layer.label}>
            <div className="svc-bar h-12 rounded-xl px-3 py-2 text-white" style={{ width: layer.width, background: layer.color, animationDelay: `${index * 0.15}s` }}>
              <span className="block text-sm font-medium">{layer.label}</span>
              <span className="block text-xs text-white/80">{layer.note}</span>
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function WhoIsMissing() {
  return (
    <figure>
      <figcaption className="text-xs font-semibold tracking-wide text-[#6b7c74]">AN AVERAGE HIDES THE DECISION</figcaption>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-[#6b7c74]">Reported average</p>
          <div className="mt-2 h-24 rounded-xl bg-[#e6e0d4]">
            <div className="svc-rise h-full w-3/5 rounded-xl bg-[#7a3e9d]" />
          </div>
        </div>
        <div>
          <p className="text-sm text-[#6b7c74]">Who is inside it</p>
          <div className="mt-2 flex h-24 items-end gap-1">
            {[80, 55, 30, 15].map((height, index) => (
              <span key={height} className="svc-rise w-full rounded-t-md bg-[#7a3e9d]" style={{ height: `${height}%`, opacity: 1 - index * 0.18, animationDelay: `${index * 0.12}s` }} />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs text-[#4d6258]">Women, young workers, and households tied to one resource can move in the opposite direction from the average.</p>
    </figure>
  );
}

function DeliveryPath() {
  const steps = ["Concept", "Design", "Delivery", "Results"];
  return (
    <figure>
      <figcaption className="text-xs font-semibold tracking-wide text-[#6b7c74]">THE WORK DOES NOT STOP AT A REPORT</figcaption>
      <ol className="mt-4 grid grid-cols-4 gap-2">
        {steps.map((step, index) => (
          <li key={step} className="text-center">
            <span className="svc-pop mx-auto flex size-10 items-center justify-center rounded-full bg-[#14382c] font-serif text-sm text-white" style={{ animationDelay: `${index * 0.2}s` }}>{index + 1}</span>
            <span className="mt-2 block text-sm text-[#14382c]">{step}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function PartnershipProduct() {
  return (
    <figure>
      <figcaption className="text-xs font-semibold tracking-wide text-[#6b7c74]">A PARTNERSHIP HAS A PRODUCT</figcaption>
      <div className="mt-4 grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-xl bg-[#14382c] px-4 py-5 text-center text-[#f6f3ec]">
          <p className="font-serif text-lg">Bhutanese institution</p>
          <p className="mt-1 text-xs text-[#b7e0c4]">Keeps the decision</p>
        </div>
        <div className="svc-pop rounded-full bg-[#e39b12] px-4 py-3 text-center text-sm font-medium text-[#14382c]">Named product</div>
        <div className="rounded-xl border border-[#e6e0d4] bg-[#f6f3ec] px-4 py-5 text-center text-[#14382c]">
          <p className="font-serif text-lg">Outside partner</p>
          <p className="mt-1 text-xs text-[#4d6258]">Method, finance, or research</p>
        </div>
      </div>
    </figure>
  );
}
