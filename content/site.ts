export const firm = {
  name: "Eco Policy Nexus International",
  tagline: "Informed Policies. Sustainable Future. Meaningful Impact.",
  serving: "A Bhutanese Firm, Serving the World",
  email: "info@ecopolicynexus.com",
  phone: "+975 2 345 678",
  phoneHref: "tel:+9752345678",
  web: "www.ecopolicynexus.com",
  address: "Thimphu, Bhutan",
  linkedin: "https://www.linkedin.com/",
  x: "https://x.com/",
  description:
    "A Bhutanese consultancy delivering evidence-based policy advice and sustainable development solutions to governments, institutions and communities worldwide.",
  contactNote: "Placeholder contact details from the site mockup, until confirmed.",
};

export const services = [
  {
    slug: "economics-data-analytics",
    title: "Economics & Data Analytics",
    summary: "Data-driven insights for inclusive growth and informed decision-making.",
    accent: "text-[#e36b1e]",
    icon: "chart",
    body: "We harness evidence and analytics for informed decision-making. Economic transformation influences employment and livelihoods, so analysis has to be usable by the people who decide. Our economists and data scientists turn research into strategies governments, businesses, and development partners can act on.",
  },
  {
    slug: "environment-climate-change",
    title: "Environment & Climate Change",
    summary: "Climate resilience, natural resource management and low-carbon pathways.",
    accent: "text-[#2f8f4e]",
    icon: "leaf",
    body: "We help clients build resilience and advance sustainable development. Climate risk changes investment decisions. Our work covers climate resilience, natural resource management, nature finance, and low-carbon pathways grounded in local realities.",
  },
  {
    slug: "gender-social-development",
    title: "Gender & Social Development",
    summary: "Promoting equality, inclusion and human development for all.",
    accent: "text-[#7a3e9d]",
    icon: "users",
    body: "Social inclusion shapes long-term development outcomes. We promote inclusive growth and people-centered progress, bringing gender, livelihoods, and human development into the same advisory process as economic and climate analysis.",
  },
  {
    slug: "business-development-project-management",
    title: "Business Development & Project Management",
    summary: "From concept to impact: project design, management and results.",
    accent: "text-[#e39b12]",
    icon: "briefcase",
    body: "We transform ideas into investable and impactful initiatives. From concept through delivery, we support project design, management, and results so analysis does not stop at a report.",
  },
  {
    slug: "global-partnership",
    title: "Global Partnership",
    summary: "Building alliances and knowledge networks for shared prosperity.",
    accent: "text-[#2b6cb0]",
    icon: "globe",
    body: "We connect Bhutan with international opportunities, knowledge, and networks. Partnerships with development institutions, universities, firms, and investors are how local insight meets global practice.",
  },
] as const;

export const heroValues = [
  { title: "Rooted in GNH Values", icon: "leaf" },
  { title: "Evidence Based", icon: "chart" },
  { title: "Globally Engaged", icon: "globe" },
  { title: "Impact Driven", icon: "leaf" },
];

export const coreValues = ["Integrity", "Inclusivity", "Sustainability", "Partnership"];

export const reasons = [
  { title: "Bhutanese Insight", body: "Deeply rooted in Bhutan's development experience, institutions, communities and values." },
  { title: "Analytical Excellence", body: "Transforming data, research and evidence into actionable strategies and informed decision-making." },
  { title: "Integrated Solutions", body: "Bringing together economic, environmental and social perspectives to address interconnected development challenges." },
  { title: "Implementation Focus", body: "Moving beyond analysis to support execution, delivery and measurable impact." },
  { title: "Global Perspective", body: "Drawing on international knowledge and partnerships while remaining grounded in local realities." },
];

export const about = {
  vision:
    "To become a trusted Bhutanese knowledge and advisory firm with regional relevance and global reach, connecting local insight with international expertise to support sustainable development and inclusive economic growth.",
  mission:
    "To help governments, organizations, businesses and development partners transform evidence into action, policies into impact and opportunities into sustainable results.",
  established:
    "Eco Policy Nexus International was established to create a modern Bhutanese advisory firm capable of delivering high-quality consulting, research and development solutions that respond to both local priorities and global challenges.",
  belief:
    "Better evidence leads to better decisions. Better decisions create better outcomes for people, economies and the planet.",
  story:
    "Bhutan's development experience shows that economic progress can be pursued alongside environmental responsibility, cultural preservation, social wellbeing and effective governance. We draw on that foundation while using modern analytical tools and international knowledge.",
  ambition:
    "Over the coming years we aim to expand capabilities in artificial intelligence and advanced analytics, development economics, climate finance, sustainable investment, digital transformation, geospatial intelligence, impact measurement, inclusive economic development, public-private partnerships, and global knowledge exchange.",
  positioning: "Rooted in Bhutan. Engaged with the World. Evidence. Solutions. Partnerships. Impact.",
};

export const mega = {
  firm: [
    { href: "/about", label: "Who we are" },
    { href: "/about#vision", label: "Vision and mission" },
    { href: "/about#story", label: "Our story" },
    { href: "/team", label: "Our team" },
    { href: "/core-values", label: "Core values" },
  ],
  services: [
    { href: "/services", label: "All services" },
    ...services.map((service) => ({ href: `/services/${service.slug}`, label: service.title })),
  ],
  insights: [
    { href: "/insights", label: "All insights" },
    { href: "/indicators", label: "Indicators" },
    { href: "/insights/financing-nature", label: "Financing Nature" },
    { href: "/insights/inclusive-green-growth", label: "Inclusive Green Growth" },
    { href: "/insights/policy-coherence", label: "Policy Coherence" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/cookies", label: "Cookie policy" },
    { href: "/accessibility", label: "Accessibility" },
    { href: "/sitemap", label: "Sitemap" },
  ],
};

export const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/core-values", label: "Core values" },
  { href: "/about#global", label: "Global engagement" },
  { href: "/contact", label: "Contact" },
];

export const publicPaths = [
  "/",
  "/about",
  "/services",
  ...services.map((service) => `/services/${service.slug}`),
  "/insights",
  "/insights/financing-nature",
  "/insights/inclusive-green-growth",
  "/insights/policy-coherence",
  "/indicators",
  "/team",
  "/core-values",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/accessibility",
  "/sitemap",
];

export const assistantContext = `
Eco Policy Nexus International is a Bhutanese advisory, research and development consulting firm.
It helps governments, institutions, businesses and development partners with economics and data analytics, environment and climate change, gender and social development, business development and project management, and global partnerships.
Vision: ${about.vision}
Mission: ${about.mission}
Positioning: ${about.positioning}
Contact email on the public site: ${firm.email}. Phone: ${firm.phone}. Address: ${firm.address}. These contact details are placeholders from the public mockup.
The assistant must not invent client names, invoices, fees, or private project details.
`.trim();
