import { services } from "@/content/site";

export const approach = [
  {
    title: "Local understanding",
    body: "Start from Bhutanese institutions, communities, and the decision a client actually has to make. Context comes before a template.",
  },
  {
    title: "Analytical rigor",
    body: "Use data, research, and clear assumptions. Say what the evidence supports and where it is thin.",
  },
  {
    title: "Strategic thinking",
    body: "Connect economic, environmental, and social choices so a recommendation does not solve one problem by creating another.",
  },
  {
    title: "Practical implementation",
    body: "Carry the work past a report: design, roles, timelines, and a way to see whether the result is happening.",
  },
  {
    title: "Global perspective",
    body: "Bring international practice in when it fits, and keep the advice accountable to local realities.",
  },
];

export const audiences = [
  {
    title: "Governments",
    body: "Ministries and public agencies that need evidence they can defend in a cabinet, a budget, or a reform.",
  },
  {
    title: "Public institutions",
    body: "Regulators, statistical offices, and public enterprises building systems that outlast a single project.",
  },
  {
    title: "Development partners",
    body: "Organizations that want Bhutanese insight joined to international standards of analysis and delivery.",
  },
  {
    title: "Businesses",
    body: "Firms weighing investment, climate risk, inclusion, or a partnership that has to work on the ground.",
  },
  {
    title: "Communities",
    body: "People affected by a policy or project, included so livelihoods and local knowledge are part of the evidence.",
  },
];

export const capabilities = [
  "Artificial intelligence and advanced analytics",
  "Development economics",
  "Climate finance",
  "Sustainable investment",
  "Digital transformation",
  "Geospatial intelligence",
  "Impact measurement",
  "Inclusive economic development",
  "Public-private partnerships",
  "Global knowledge exchange",
];

export const regions = [
  { name: "Asia", note: "Home region. Work is based in Thimphu and arranged with partners across Asia when a mandate needs it." },
  { name: "Africa", note: "Shared questions on growth, climate, and inclusion, taken up through knowledge exchange rather than a local office." },
  { name: "Europe", note: "Research, finance, and institutional partners where a Bhutanese brief needs an outside counterpart." },
  { name: "Pacific", note: "Island and mountain contexts where resilience and small-economy policy travel in both directions." },
  { name: "Americas", note: "Collaboration scoped to the assignment: methods, investment, or joint learning." },
];

export const rolePairs = [
  ["Evidence", "Policy that can be explained"],
  ["Strategy", "Implementation with owners and dates"],
  ["Growth", "Environmental and social limits"],
  ["Communities", "Institutions that decide"],
  ["Bhutanese experience", "International knowledge"],
];

export const serviceGuides: Record<
  (typeof services)[number]["slug"],
  {
    lead: string;
    offerings: { title: string; body: string }[];
    questions: string[];
    deliverables: string[];
  }
> = {
  "economics-data-analytics": {
    lead: "Economic transformation changes jobs, prices, public revenue, and who can take part in growth. Analysis is useful when the people who decide can see the trade-offs.",
    offerings: [
      { title: "Growth diagnostics", body: "Read the structure of an economy: what is driving output, where constraints sit, and which reforms would move more than one outcome." },
      { title: "Livelihoods and labour", body: "Connect macro figures to employment, skills, and household income so a growth story is also a jobs story." },
      { title: "Public investment screening", body: "Help teams compare options with costs, benefits, and the assumptions that would change the ranking." },
      { title: "Indicator systems", body: "Design a small set of measures that can be updated, explained, and used in a budget or a board paper." },
    ],
    questions: [
      "Which constraint is actually binding growth or inclusion?",
      "Who gains and who is left out if this policy proceeds?",
      "What would we need to see in the data to change course?",
    ],
    deliverables: ["A decision brief with sources and caveats", "A worked options table", "An indicator note staff can maintain"],
  },
  "environment-climate-change": {
    lead: "Climate risk changes where money should go. Natural resources carry livelihoods as well as ecosystems. Advice has to be specific to the place and the institution that will carry it.",
    offerings: [
      { title: "Resilience assessment", body: "Identify climate and environmental risks that alter investment, infrastructure, or community plans." },
      { title: "Natural resource management", body: "Support rules and incentives for land, water, forests, and biodiversity that people can actually apply." },
      { title: "Nature and climate finance", body: "Shape finance so conservation and low-carbon choices are funded without cutting off local livelihoods." },
      { title: "Low-carbon pathways", body: "Set out practical routes that respect energy needs, fiscal limits, and the institutions in place." },
    ],
    questions: [
      "Which risks change this decision in the next planning cycle?",
      "How is nature finance governed, and who benefits?",
      "What can be implemented with current capacity?",
    ],
    deliverables: ["A risk and options note", "A finance or pathway outline", "Safeguards written for the implementing body"],
  },
  "gender-social-development": {
    lead: "Inclusion is part of whether development lasts. Gender, livelihoods, and human development belong in the same process as economic and climate analysis, not in a separate annex.",
    offerings: [
      { title: "Integrated gender analysis", body: "Show how a policy or investment lands differently across women, men, and groups who are often missed." },
      { title: "People-centered design", body: "Build participation into the evidence, so affected communities shape the questions and the test of success." },
      { title: "Human development links", body: "Tie education, health, and social protection questions to the economic or climate decision at hand." },
      { title: "Equity in results", body: "Define results that record who benefits, not only whether an average improved." },
    ],
    questions: [
      "Whose outcomes change if this proceeds as designed?",
      "What local knowledge is missing from the dataset?",
      "How will inclusion be checked during delivery?",
    ],
    deliverables: ["An inclusion note inside the main brief", "A participation record", "Results that can be disaggregated"],
  },
  "business-development-project-management": {
    lead: "A sound idea still fails if nobody owns delivery. This practice turns analysis into a project that can be financed, managed, and judged.",
    offerings: [
      { title: "Concept to investment case", body: "Shape an idea into a concept note or case a partner, ministry, or investor can review." },
      { title: "Project design", body: "Set objectives, activities, risks, and a results framework that matches the resources on offer." },
      { title: "Delivery support", body: "Help teams run milestones, coordination, and course corrections without losing the original purpose." },
      { title: "Learning and close-out", body: "Record what changed, what did not, and what the next decision should inherit." },
    ],
    questions: [
      "What decision does this project unlock?",
      "Who delivers each part, and with what capacity?",
      "How will we know the result is real?",
    ],
    deliverables: ["A concept or investment note", "A delivery plan with owners", "A results and learning note"],
  },
  "global-partnership": {
    lead: "Bhutanese insight meets global practice through relationships that are specific: a research question, a finance structure, or a peer exchange with a clear product.",
    offerings: [
      { title: "Knowledge partnerships", body: "Connect universities, firms, and public institutions around a defined piece of work." },
      { title: "Development collaboration", body: "Help partners and Bhutanese institutions scope joint analysis or implementation." },
      { title: "Investment conversations", body: "Prepare the evidence and the questions for a discussion with a financier or practitioner." },
      { title: "Exchange and convening", body: "Design a focused exchange so people leave with a method or a decision, not only a meeting note." },
    ],
    questions: [
      "What will the partnership produce in this cycle?",
      "Which local institution remains responsible after the visitors leave?",
      "What knowledge should travel back to Bhutan?",
    ],
    deliverables: ["A partnership scope", "A joint work outline", "A short record of what was learned"],
  },
};

export const engagementSteps = [
  { title: "Frame the decision", body: "Name the choice, the deadline, and who must be able to use the result." },
  { title: "Assemble evidence", body: "Gather data, interviews, and prior work. Mark what is firm and what is still uncertain." },
  { title: "Test options", body: "Compare paths across economic, environmental, and social effects." },
  { title: "Support delivery", body: "Leave owners, a sequence, and a way to tell whether the choice is working." },
];

export const valueDetails: Record<string, { body: string; practices: string[] }> = {
  Integrity: {
    body: "Advice is only useful if a reader can see what it rests on. We separate evidence from opinion, and we say when a figure is illustrative, sourced, or still unknown.",
    practices: [
      "Cite the source of a number or say that it is a firm illustration.",
      "State the assumption that would reverse a recommendation.",
      "Decline to invent client results, fees, or official statistics.",
    ],
  },
  Inclusivity: {
    body: "People who live with a decision belong in the analysis. Inclusion is a method: whose data is missing, who is in the room, and who the result is for.",
    practices: [
      "Ask who is absent from the average.",
      "Bring gender and livelihoods into the main argument.",
      "Write so a non-specialist can follow the choice.",
    ],
  },
  Sustainability: {
    body: "Economic progress is weighed with environmental stewardship and social wellbeing. A gain that exhausts the resource or the community is not treated as success.",
    practices: [
      "Put climate and nature constraints next to the growth case.",
      "Look past the project close to the system that remains.",
      "Prefer options that a local institution can maintain.",
    ],
  },
  Partnership: {
    body: "Impact grows when Bhutanese insight works with international collaboration. Partnerships are scoped, so both sides know the product and who remains responsible.",
    practices: [
      "Define the joint product before the collaboration starts.",
      "Keep a Bhutanese institution in the lead where the decision sits.",
      "Share methods, not only conclusions.",
    ],
  },
};

export const teamPractices = [
  { title: "Economics and data", body: "Economists and data scientists who turn research into a strategy someone can act on." },
  { title: "Climate and environment", body: "Advisers on resilience, natural resources, nature finance, and low-carbon choices." },
  { title: "Social development", body: "Specialists in gender, livelihoods, and human development inside the same brief as the economics." },
  { title: "Delivery", body: "Project and business analysts who carry a concept through design, management, and results." },
  { title: "Partnerships", body: "People who connect Bhutanese institutions with universities, firms, and development partners." },
];

export const howWeWork = [
  { title: "One brief, several lenses", body: "Economic, environmental, and social questions are written together when they affect the same decision." },
  { title: "Named uncertainty", body: "The team marks what is known, what is estimated, and what still needs fieldwork or a partner dataset." },
  { title: "A usable product", body: "The output is a brief, a design, or a results note that the client’s own staff can carry." },
];

export const contactPaths = [
  { title: "Advisory", body: "A government, institution, business, or partner needs a decision brief, an assessment, or a design." },
  { title: "Research", body: "A question for the insights series, an indicator, or a joint study with a clear public product." },
  { title: "Partnership", body: "A university, firm, or development organization wants a scoped collaboration." },
  { title: "General", body: "Press, corrections, privacy requests, and accessibility barriers." },
];

export const afterYouWrite = [
  { title: "Received", body: "The form stores your name, email, organization, and message so staff can reply." },
  { title: "Read", body: "A person at the firm reads it. There is no automatic quote or contract." },
  { title: "Reply", body: "If the request fits the practice, we write back to arrange a conversation and a scope." },
];

export const indicatorGroups = [
  {
    title: "Economy",
    intro: "Growth, prices, investment, and trade describe the room a policy has to move.",
    labels: ["GDP Growth", "Inflation", "Investment", "Trade Growth"],
  },
  {
    title: "People",
    intro: "Employment is the bridge between a growth figure and a livelihood.",
    labels: ["Employment"],
  },
  {
    title: "Planet and progress",
    intro: "Climate, biodiversity, and a composite SDG score keep the economic picture from standing alone.",
    labels: ["Climate Risk", "Biodiversity", "SDG Progress"],
  },
];

export const indicatorNotes: Record<string, string> = {
  "GDP Growth": "Real GDP growth for Bhutan when the live World Bank series is available. Staff can override the displayed figure.",
  Inflation: "Consumer price inflation for Bhutan from the live series, unless a staff override is set.",
  Investment: "A firm illustration of investment momentum. It is not an official investment rate.",
  Employment: "A firm illustration of employment. It is not an official labour-force statistic.",
  "Trade Growth": "Export growth from the live World Bank series. The period label may read Global when the series is used that way on the site.",
  "Climate Risk": "A firm summary label, not a physical-risk model score.",
  Biodiversity: "A firm summary label for the direction of pressure on nature, not a species index.",
  "SDG Progress": "An illustrative composite out of 100 for the dashboard. It is not a United Nations SDG index release.",
};

export const figureOrigins = [
  { title: "Live series", body: "GDP growth, inflation, and trade growth can refresh from World Bank series coded on each indicator." },
  { title: "Staff override", body: "A published override replaces the live or seed value when the firm needs a corrected display." },
  { title: "Firm illustration", body: "Investment, employment, climate, biodiversity, and the SDG score are seed figures until a sourced series replaces them." },
];

export const insightEssays: Record<
  string,
  { related: string; figureTitle: string; figurePoints: string[]; markdown: string }
> = {
  "financing-nature": {
    related: "/services/environment-climate-change",
    figureTitle: "What nature finance has to hold together",
    figurePoints: ["Capital for conservation", "Livelihoods that depend on the same landscape", "A public institution that can govern the flow", "A measure that shows whether nature and people both gained"],
    markdown: `## The financing problem

Biodiversity work fails when it is funded as a project beside the economy rather than inside it. Forests, watersheds, and species habitat often support the same households that a growth or infrastructure decision will affect. A finance structure that pays for protection and ignores that income does not last.

Eco Policy Nexus International treats nature finance as a policy design task. The question is not only where the money comes from. It is who governs it, who is expected to change behavior, and which evidence would show that conservation and livelihoods moved together.

## What a workable structure needs

- A landscape or resource that someone already manages, so the finance has an institutional home.
- A clear use of proceeds: restoration, stewardship payments, safeguards, or a public investment that reduces pressure on the resource.
- Rules for who qualifies and who is excluded, written so communities can see them.
- A small set of measures for ecological condition and for household or local income, updated on a cycle the institution can keep.

International instruments, from public budgets to private and blended finance, are useful when they fit those rules. They are not a substitute for them.

## How we approach an assignment

We start with the decision the client has to make: a budget line, a fund design, a safeguard, or a partnership with an investor. Evidence is assembled around that decision. Options are compared for fiscal realism, local legitimacy, and whether the result can be measured without a parallel consultancy forever.

The product is a brief or a design the responsible institution can defend. We do not publish client names or private terms on this site.

## What to watch

Nature finance is easy to over-claim. A memorandum is not a hectare restored. A pledge is not a livelihood. The commentary on this site keeps that distinction, and the indicator dashboard labels firm illustrations separately from World Bank series.`,
  },
  "inclusive-green-growth": {
    related: "/services/gender-social-development",
    figureTitle: "Three questions in one decision",
    figurePoints: ["Does the growth path create usable work?", "Who is left out of the average gain?", "Which environmental limit does this option cross?"],
    markdown: `## Growth that can be lived with

Developing economies are asked to raise incomes and cut environmental damage at the same time. Those goals conflict when they are written in separate strategies. A road, a power choice, or a sector bet changes jobs and ecosystems together. Inclusive green growth is the practice of making that joint effect visible before the decision.

This note is a firm perspective, not a forecast and not an official plan for Bhutan or any other country.

## Pathways, not slogans

A pathway is a sequence: which sector moves first, which skill or service has to exist, which household bears the cost of the transition, and which regulation makes the environmental limit real. Without that sequence, "green" and "inclusive" stay as adjectives on an unchanged project.

We look for pathways that a ministry or a business can actually stage. That means fiscal room, delivery capacity, and a result that can be checked. It also means saying when an option is attractive on climate grounds and weak on employment, or the reverse.

## Equity inside the model

An average improvement can hide a loss for women, young workers, or a valley that depends on one resource. Gender and social analysis belong in the growth note itself. The test is simple: if the distribution of gains is unknown, the recommendation is incomplete.

## Using the evidence

Data will often be partial. The honest product marks the gap and still helps the client choose among the options they have. Where a live series exists, the indicators page shows it. Where the site shows a firm illustration, it says so. Neither should be pasted into a speech as an official statistic.`,
  },
  "policy-coherence": {
    related: "/services/economics-data-analytics",
    figureTitle: "Where incoherence usually shows up",
    figurePoints: ["Energy policy versus the fiscal cost of the transition", "Labour policy versus the sectors asked to shrink or grow", "Social protection versus the households who pay the adjustment", "Environment rules versus the project timeline"],
    markdown: `## Coherence is a design task

A just and resilient transition fails in the gaps between policies. Energy, tax, labour, social protection, and environmental rules are often written by different teams on different calendars. Each paper can be internally sound and still contradict the next one. People experience the contradiction as a price, a job, or a rule they cannot follow.

Policy coherence means testing a package, not perfecting a single document.

## What we test

We line the instruments up against one decision. If the energy path assumes a workforce the labour policy does not train, the package is not coherent. If the fiscal note removes a subsidy that poor households use, and social protection does not replace it, the transition is not just. If the project timeline ignores a safeguard, the environmental goal is only on the cover.

The test is practical. It asks whether the package can be financed, delivered by the institutions that exist, and explained to the people who will live with it.

## From alignment to delivery

Coherence on paper still needs owners. Each instrument needs a responsible unit, a date, and a signal that would trigger a revision. That is where project management and economics meet. A coherence matrix that nobody updates is another report.

## A limit on this commentary

This insight does not score any government's current policies. It sets out how the firm approaches the problem when a client asks for help. Official positions remain with the institutions that hold them.`,
  },
};

export function resolveInsightBody(slug: string, stored: string) {
  const essay = insightEssays[slug];
  if (!essay) return stored;
  if (stored.trim().length >= essay.markdown.length) return stored;
  return essay.markdown;
}
