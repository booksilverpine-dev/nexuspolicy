import { writeFileSync, mkdirSync } from "node:fs";

const colors = ["#e23d32", "#f07820", "#f2c14e", "#3c9a46", "#1aa3a3", "#2f6fe8", "#5b4db8", "#9a3d96"];

function wedge(cx, cy, r, i, n) {
  const a0 = (i / n) * Math.PI * 2 - Math.PI / 2;
  const a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  return `M ${cx} ${cy} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

function wheel({ size = 64, hub = 14, r = 30 }) {
  const c = size / 2;
  const wedges = colors
    .map((fill, i) => `<path d="${wedge(c, c, r, i, 8)}" fill="${fill}"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" role="img" aria-labelledby="title">
<title id="title">Eco Policy Nexus International</title>
${wedges}
<circle cx="${c}" cy="${c}" r="${hub}" fill="#f4d36a" stroke="#c8962e" stroke-width="1.5"/>
<circle cx="${c}" cy="${c}" r="${hub * 0.38}" fill="#fff6d8"/>
</svg>`;
}

function wheelOnDark() {
  const c = 32;
  const wedges = colors
    .map((_, i) => `<path d="${wedge(c, c, 30, i, 8)}" fill="${i % 2 ? "#f4d36a" : "#f6f3ec"}"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="title">
<title id="title">Our core values</title>
${wedges}
<circle cx="32" cy="32" r="12" fill="#14382c" stroke="#f4d36a" stroke-width="2"/>
</svg>`;
}

const lockup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 86" role="img" aria-labelledby="title">
<title id="title">Eco Policy Nexus International</title>
<g transform="translate(4,4)">${wheel({ size: 78, hub: 16, r: 36 }).replace(/<svg[^>]*>|<\/svg>/g, "").replace(/<title[\s\S]*?<\/title>/, "")}</g>
<text x="96" y="32" fill="#14382c" font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="1.5">ECO POLICY NEXUS</text>
<text x="96" y="52" fill="#e36b1e" font-family="Georgia, 'Times New Roman', serif" font-size="13" letter-spacing="4">INTERNATIONAL</text>
<text x="96" y="72" fill="#3d5c50" font-family="Calibri, 'Segoe UI', sans-serif" font-size="11">Informed Policies. Sustainable Future. Meaningful Impact.</text>
</svg>`;

mkdirSync("public/brand", { recursive: true });
mkdirSync("public/infographics", { recursive: true });
mkdirSync("app", { recursive: true });

writeFileSync("public/brand/mark.svg", wheel({}));
writeFileSync("public/brand/mark-on-dark.svg", wheelOnDark());
writeFileSync("public/brand/lockup.svg", lockup);
writeFileSync("public/brand/icon.svg", wheel({ size: 64, hub: 18, r: 31 }));
writeFileSync("app/icon.svg", wheel({ size: 64, hub: 18, r: 31 }));

const mountains = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" role="img" aria-label="Mountain ridge">
<path fill="#e07a2f" d="M0 120 L0 78 L80 70 L140 88 L220 40 L300 86 L380 52 L460 90 L540 28 L640 84 L740 36 L820 78 L920 22 L1040 80 L1140 48 L1240 86 L1340 40 L1440 74 L1440 120 Z"/>
<path fill="#c45e18" opacity="0.85" d="M0 120 L120 92 L240 100 L360 70 L500 96 L680 64 L860 98 L1040 72 L1220 94 L1440 68 L1440 120 Z"/>
</svg>`;

const sdg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" role="img" aria-label="SDG progress 72 of 100">
<circle cx="40" cy="40" r="30" fill="none" stroke="#e6e0d6" stroke-width="8"/>
<circle cx="40" cy="40" r="30" fill="none" stroke="#1aa3a3" stroke-width="8" stroke-linecap="round" stroke-dasharray="135.7 188.5" transform="rotate(-90 40 40)"/>
<text x="40" y="44" text-anchor="middle" font-size="14" font-family="Calibri, sans-serif" fill="#14382c">72</text>
</svg>`;

const story = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 120" role="img" aria-label="Bhutan to global impact">
${["Bhutan", "Knowledge", "Solutions", "Partnerships", "Global Impact"]
  .map((label, i) => {
    const x = 20 + i * 192;
    return `<rect x="${x}" y="28" width="160" height="64" rx="12" fill="${i === 4 ? "#14382c" : "#fff"}" stroke="#14382c"/>
<text x="${x + 80}" y="66" text-anchor="middle" font-size="14" font-family="Calibri, sans-serif" fill="${i === 4 ? "#f6f3ec" : "#14382c"}">${label}</text>
${i < 4 ? `<path d="M${x + 164} 60 H${x + 184}" stroke="#e36b1e" stroke-width="2" marker-end="url(#arrow)"/>` : ""}`;
  })
  .join("")}
<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#e36b1e"/></marker></defs>
</svg>`;

const approach = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 140" role="img" aria-label="Our approach">
${["Local understanding", "Analytical rigor", "Strategic thinking", "Practical implementation", "Global perspective"]
  .map((label, i) => {
    const x = 16 + i * 194;
    return `<circle cx="${x + 80}" cy="36" r="18" fill="#14382c"/><text x="${x + 80}" y="41" text-anchor="middle" fill="#f6f3ec" font-size="14" font-family="Calibri, sans-serif">${i + 1}</text>
<text x="${x + 80}" y="88" text-anchor="middle" fill="#14382c" font-size="13" font-family="Calibri, sans-serif">${label.split(" ")[0]}</text>
<text x="${x + 80}" y="106" text-anchor="middle" fill="#14382c" font-size="13" font-family="Calibri, sans-serif">${label.split(" ").slice(1).join(" ")}</text>`;
  })
  .join("")}
</svg>`;

const bridge = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 280" role="img" aria-label="We serve as a bridge">
${[
  ["Evidence", "Policy"],
  ["Strategy", "Implementation"],
  ["Growth", "Sustainability"],
  ["Communities", "Institutions"],
  ["Bhutanese experience", "International knowledge"],
]
  .map(([a, b], i) => {
    const y = 16 + i * 52;
    return `<rect x="16" y="${y}" width="250" height="40" rx="8" fill="#fff" stroke="#14382c"/>
<text x="141" y="${y + 26}" text-anchor="middle" font-size="14" font-family="Calibri, sans-serif" fill="#14382c">${a}</text>
<text x="360" y="${y + 26}" text-anchor="middle" font-size="16" fill="#e36b1e">↔</text>
<rect x="454" y="${y}" width="250" height="40" rx="8" fill="#14382c"/>
<text x="579" y="${y + 26}" text-anchor="middle" font-size="14" font-family="Calibri, sans-serif" fill="#f6f3ec">${b}</text>`;
  })
  .join("")}
</svg>`;

const map = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320" role="img" aria-label="Global reach">
<rect width="640" height="320" fill="#f7f4ee"/>
<path fill="#d9e2dc" d="M70 70c40-30 90-20 120 10 20 20 10 40-10 50-30 10-70 0-90-20-10-20-10-30-20-40zM210 60c50-10 90 20 80 50-10 30-60 40-90 20-20-16-16-50 10-70zM300 80c40-20 100 0 110 30 8 24-10 50-40 54-36 4-70-20-70-48 0-16 8-28 0-36zM430 70c30-16 70-6 84 16 10 18 0 40-22 48-28 10-60-8-62-32 0-14 8-24 0-32zM80 140c30-8 70 6 78 28 6 18-10 36-36 40-30 4-58-10-60-32-2-16 6-30 18-36zM180 150c40-16 90 0 96 28 4 22-16 40-48 42-36 2-70-16-68-40 2-16 8-24 20-30zM300 150c50-10 90 16 86 42-4 22-30 36-64 32-34-4-60-24-52-46 6-16 16-24 30-28zM430 146c36-12 80 8 78 34-2 22-28 36-58 32-28-4-48-22-42-40 4-12 12-20 22-26zM120 210c28-8 60 4 64 22 4 16-12 30-36 30-22 0-40-12-40-28 0-10 6-18 12-24zM250 214c40-10 70 8 66 28-4 16-24 28-50 24-24-4-40-16-36-32 4-10 10-16 20-20z"/>
<g font-family="Calibri, sans-serif" font-size="11">
<circle cx="470" cy="120" r="7" fill="#3c9a46"/><text x="482" y="124" fill="#14382c">Asia</text>
<circle cx="340" cy="190" r="7" fill="#e23d32"/><text x="352" y="194" fill="#14382c">Africa</text>
<circle cx="330" cy="110" r="7" fill="#2f6fe8"/><text x="250" y="100" fill="#14382c">Europe</text>
<circle cx="540" cy="210" r="7" fill="#f07820"/><text x="500" y="236" fill="#14382c">Pacific</text>
<circle cx="150" cy="150" r="7" fill="#9a3d96"/><text x="110" y="140" fill="#14382c">Americas</text>
</g>
</svg>`;

writeFileSync("public/infographics/mountains.svg", mountains);
writeFileSync("public/infographics/sdg-ring.svg", sdg);
writeFileSync("public/infographics/story-flow.svg", story);
writeFileSync("public/infographics/approach.svg", approach);
writeFileSync("public/infographics/bridge.svg", bridge);
writeFileSync("public/infographics/world-map.svg", map);
console.log("brand assets written");
