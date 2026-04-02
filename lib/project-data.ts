export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectContactRoute {
  quickMessage?: string | null
  ctaLabel?: string | null
  emailDelivery?: boolean | null
  whatsappNotification?: boolean | null
}

export interface ProjectRecord {
  name: string
  slug: string
  description?: string | null
  domain?: string | null
  language?: string | null
  stars?: number | null
  forks?: number | null
  featured?: boolean | null
  youtubeUrl?: string | null
  tags?: string[]
  repoUrl?: string | null
  isPrivate?: boolean | null
  status?: string | null
  year?: string | null
  team?: string | null
  logoUrl?: string | null
  logoAlt?: string | null
  logoMonogram?: string | null
  summary?: string | null
  readmePreview?: string[]
  highlights?: string[]
  metrics?: ProjectMetric[]
  contactRouting?: ProjectContactRoute
  renderedHtml?: string | null
  isSample?: boolean
}

export interface BackendProjectContactRoute {
  ctaLabel?: string | null
  emailDelivery?: boolean | null
  whatsappNotification?: boolean | null
  quickMessage?: string | null
}

export interface BackendProjectInput extends Partial<ProjectRecord> {
  contentBlocks?: string[] | null
  contactRoute?: BackendProjectContactRoute | null
}

export const sampleProjects: ProjectRecord[] = [
  {
    name: "Domain Control Center",
    slug: "domain-control-center",
    description: "A command-style portfolio dashboard that lets visitors jump from domain-level storytelling into real project detail.",
    domain: "web-app",
    language: "TypeScript",
    stars: 18,
    forks: 4,
    featured: true,
    tags: ["Next.js", "Tailwind", "Motion", "CMS"],
    repoUrl: "https://github.com/pankaj5536455/domain-control-center",
    isPrivate: false,
    status: "Shipping",
    year: "2026",
    team: "Solo build",
    logoMonogram: "DC",
    summary: "Built to feel like an engineering control room while still staying readable on mobile.",
    readmePreview: [
      "This project turns a standard portfolio into a layered product surface. The homepage introduces broad engineering domains, then progressively reveals build details, tool choices, and project depth without breaking the overall narrative.",
      "The frontend is organized around reusable visual systems: accent-driven panels, motion transitions, and content blocks that can accept CMS data later. The goal is to keep the experience premium even when data is incomplete during development.",
    ],
    highlights: [
      "Expandable storytelling instead of static project cards",
      "Prepared for CMS-managed logos, readme excerpts, and CTA routing",
      "Mobile-safe layout with preserved visual hierarchy",
    ],
    metrics: [
      { label: "Build Time", value: "<2.0s" },
      { label: "Sections Refactored", value: "4" },
      { label: "Responsive Breakpoints", value: "3" },
    ],
    contactRouting: {
      quickMessage: "Hi, I am interested in the Domain Control Center repository. Could you share access or more details?",
      ctaLabel: "View Repository",
      emailDelivery: true,
      whatsappNotification: true,
    },
    isSample: true,
  },
  {
    name: "Mesh Sentinel",
    slug: "mesh-sentinel",
    description: "An edge-monitoring system for distributed sensor fleets with live telemetry and health snapshots.",
    domain: "iot",
    language: "Rust",
    stars: 27,
    forks: 8,
    featured: true,
    tags: ["Rust", "MQTT", "LoRaWAN", "Grafana"],
    repoUrl: "https://github.com/pankaj5536455/mesh-sentinel",
    isPrivate: false,
    status: "Production pilot",
    year: "2025",
    team: "2 engineers",
    logoMonogram: "MS",
    summary: "Focused on resilient telemetry flows and readable operational dashboards for field hardware.",
    readmePreview: [
      "Mesh Sentinel was designed for environments where devices are physically distant, power constrained, and difficult to recover when something fails. The platform emphasizes telemetry confidence over flashy dashboards.",
      "The web console rolls up sensor health, packet drift, and per-node battery trends into a single view so operators can understand a network at a glance before drilling into individual devices.",
    ],
    highlights: [
      "Low-bandwidth friendly sync design",
      "Operational dashboards tuned for support teams",
      "Clear failure surfaces across the fleet",
    ],
    metrics: [
      { label: "Nodes Simulated", value: "240" },
      { label: "Uptime Target", value: "99.7%" },
      { label: "Telemetry Delay", value: "<4s" },
    ],
    contactRouting: {
      quickMessage: "Hi, I am interested in the Mesh Sentinel repository. Could you share access or more details?",
      ctaLabel: "View Repository",
      emailDelivery: true,
      whatsappNotification: true,
    },
    isSample: true,
  },
  {
    name: "API Orchestrator",
    slug: "api-orchestrator",
    description: "A backend control layer for sync jobs, caching, and CMS-driven overrides across multiple public endpoints.",
    domain: "backend",
    language: "Java",
    stars: 12,
    forks: 3,
    featured: false,
    tags: ["Spring Boot", "PostgreSQL", "Flyway", "GitHub API"],
    repoUrl: "https://github.com/pankaj5536455/api-orchestrator",
    isPrivate: false,
    status: "Internal platform",
    year: "2025",
    team: "Solo build",
    logoMonogram: "AO",
    summary: "Handles data sync, normalization, and admin workflows behind a clean API surface.",
    readmePreview: [
      "API Orchestrator keeps the public portfolio API clean by moving sync logic, migration management, and content overrides into a backend layer that can evolve independently of the website shell.",
      "The system is intentionally boring in the best way: predictable jobs, explicit migrations, and admin endpoints that can be secured and expanded without rewriting the public-facing frontend.",
    ],
    highlights: [
      "Flyway-managed schema evolution",
      "GitHub sync pipeline with admin controls",
      "API surface separated from CMS concerns",
    ],
    metrics: [
      { label: "Endpoints", value: "9" },
      { label: "Migrations", value: "17" },
      { label: "Sync Modes", value: "3" },
    ],
    contactRouting: {
      quickMessage: "Hi, I am interested in the API Orchestrator repository. Could you share access or more details?",
      ctaLabel: "View Repository",
      emailDelivery: true,
      whatsappNotification: true,
    },
    isSample: true,
  },
  {
    name: "Design Systems Forge",
    slug: "design-systems-forge",
    description: "A component library workspace for building expressive interfaces with predictable interaction patterns.",
    domain: "frontend",
    language: "TypeScript",
    stars: 21,
    forks: 5,
    featured: false,
    tags: ["React", "Radix", "Storybook", "Framer Motion"],
    repoUrl: "https://github.com/pankaj5536455/design-systems-forge",
    isPrivate: false,
    status: "Ongoing",
    year: "2026",
    team: "Solo build",
    logoMonogram: "DS",
    summary: "A visual playground for testing composition, motion, and polished component APIs.",
    readmePreview: [
      "Design Systems Forge is where interface ideas are hardened into repeatable components. It focuses on states, edge cases, and consistent behavior rather than screenshot-perfect demos only.",
      "This project is also the inspiration for the logo-ready layout in the new portfolio project panel: every project should be able to carry its own mark without breaking the system around it.",
    ],
    highlights: [
      "Logo-aware project presentation blocks",
      "Reusable interaction patterns for cards and drawers",
      "Accessible components with layered visual treatment",
    ],
    metrics: [
      { label: "Components", value: "50+" },
      { label: "Interaction States", value: "120+" },
      { label: "Themes Tested", value: "6" },
    ],
    contactRouting: {
      quickMessage: "Hi, I am interested in the Design Systems Forge repository. Could you share access or more details?",
      ctaLabel: "View Repository",
      emailDelivery: true,
      whatsappNotification: true,
    },
    isSample: true,
  },
]

function normalizeProjectKey(value?: string | null) {
  return (value || "").trim().toLowerCase()
}

function createMonogram(name: string) {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")

  return letters || "PR"
}

function createSampleReadme(project: Partial<ProjectRecord>) {
  const projectName = project.name || "This project"
  const description = project.description || "A detailed build summary will be added here."
  const language = project.language || "TypeScript"
  const domain = project.domain || "engineering"
  const tags = project.tags?.length ? project.tags.join(", ") : "core tooling"

  return [
    `${projectName} is currently using placeholder readme content in the frontend. The final backend integration will replace this block with synced repository data, longer descriptions, and any CMS overrides needed for presentation.`,
    `For now, this preview shows how a detailed project narrative will look inside the site. The current summary is: ${description}`,
    `Expected stack emphasis: ${language} across the ${domain} domain, with supporting tools such as ${tags}.`,
  ]
}

function createSampleHighlights(project: Partial<ProjectRecord>) {
  const domain = project.domain || "system"
  const language = project.language || "TypeScript"

  return [
    `Prepared for deeper ${domain} storytelling once backend data is available`,
    `Designed to surface repository context, tool stack, and build notes clearly`,
    `Uses ${language} as the current primary implementation signal`,
  ]
}

function createSampleMetrics(project: Partial<ProjectRecord>) {
  return [
    { label: "Readme Status", value: "Sample" },
    { label: "Logo Slot", value: "Ready" },
    { label: "CTA Flow", value: project.isPrivate ? "Contact" : "Repository" },
  ]
}

export function buildProjectRecord(project: BackendProjectInput, index = 0): ProjectRecord {
  const matchedSample = sampleProjects.find(
    (sample) =>
      normalizeProjectKey(sample.slug) === normalizeProjectKey(project.slug) ||
      normalizeProjectKey(sample.name) === normalizeProjectKey(project.name)
  )
  const baseline = matchedSample || sampleProjects[index % sampleProjects.length]

  const name = project.name || baseline.name
  const slug = project.slug || baseline.slug
  const isPrivate = project.isPrivate ?? baseline.isPrivate ?? false
  const description = project.description || baseline.description || "Description coming soon."
  const tags = project.tags?.length ? project.tags : baseline.tags || []

  const contactRouting: ProjectContactRoute = {
    ...baseline.contactRouting,
    ...project.contactRouting,
    ...(project.contactRoute
      ? {
          ctaLabel: project.contactRoute.ctaLabel ?? undefined,
          emailDelivery: project.contactRoute.emailDelivery ?? undefined,
          whatsappNotification: project.contactRoute.whatsappNotification ?? undefined,
          quickMessage: project.contactRoute.quickMessage ?? undefined,
        }
      : {}),
  }

  if (!contactRouting.quickMessage) {
    contactRouting.quickMessage = `Hi, I am interested in the ${name} repository. Could you please share access or more details?`
  }
  if (contactRouting.emailDelivery == null) {
    contactRouting.emailDelivery = true
  }
  if (contactRouting.whatsappNotification == null) {
    contactRouting.whatsappNotification = true
  }

  return {
    ...baseline,
    ...project,
    name,
    slug,
    description,
    domain: project.domain || baseline.domain,
    language: project.language || baseline.language || "TypeScript",
    stars: project.stars ?? baseline.stars ?? null,
    forks: project.forks ?? baseline.forks ?? null,
    featured: project.featured ?? baseline.featured ?? false,
    youtubeUrl: project.youtubeUrl || baseline.youtubeUrl || null,
    tags,
    repoUrl: isPrivate ? null : project.repoUrl || baseline.repoUrl || null,
    isPrivate,
    status: project.status || baseline.status || "In progress",
    year: project.year || baseline.year || "2026",
    team: project.team || baseline.team || "Solo build",
    logoUrl: project.logoUrl || baseline.logoUrl || null,
    logoAlt: project.logoAlt || baseline.logoAlt || `${name} logo`,
    logoMonogram: project.logoMonogram || baseline.logoMonogram || createMonogram(name),
    summary: project.summary || baseline.summary || description,
    readmePreview:
      project.readmePreview?.length
        ? project.readmePreview
        : project.contentBlocks?.length
          ? project.contentBlocks.filter(Boolean)
        : baseline.readmePreview?.length
          ? baseline.readmePreview
          : createSampleReadme({ ...project, name, description, tags }),
    highlights:
      project.highlights?.length
        ? project.highlights
        : baseline.highlights?.length
          ? baseline.highlights
          : createSampleHighlights({ ...project, domain: project.domain || baseline.domain, language: project.language || baseline.language }),
    metrics:
      project.metrics?.length
        ? project.metrics
        : baseline.metrics?.length
          ? baseline.metrics
          : createSampleMetrics({ ...project, isPrivate }),
    contactRouting,
    renderedHtml: project.renderedHtml || baseline.renderedHtml || null,
    isSample: project.isSample ?? baseline.isSample ?? false,
  }
}
