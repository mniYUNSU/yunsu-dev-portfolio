export type ProjectLink = {
  live?: string;
  github?: string;
};

export type Project = {
  title: string;
  description: string;
  year: string;
  tech: string[];
  role: string;
  highlights: string[];
  image: string;
  links: ProjectLink;
};

export const projects: Project[] = [
  {
    title: "Pulse Analytics Platform",
    description:
      "Realtime product analytics dashboards blending live funnels, feature health scores, and anomaly alerts for growth teams.",
    year: "2024",
    tech: ["Next.js", "TypeScript", "tRPC", "Tailwind", "Framer Motion"],
    role: "Lead Front-end Engineer",
    highlights: [
      "Shipped sub-second drilldowns over 50M events with streamed hydration and suspense caching.",
      "Built motion-first component kit shared across growth and ops squads, reducing duplicated UI by 40%.",
      "Partnered with design to codify data viz accessibility standards across light/dark themes.",
    ],
    image: "/images/projects/pulse-analytics.png",
    links: {
      live: "https://pulse.yunsu.dev",
      github: "https://github.com/yunsux/pulse-analytics",
    },
  },
  {
    title: "Sirius Collaboration Suite",
    description:
      "Multiplayer whiteboarding surface with presence cursors, async annotations, and granular sharing controls.",
    year: "2023",
    tech: ["React", "WebRTC", "Zustand", "Tailwind", "Radix UI"],
    role: "Product Engineer",
    highlights: [
      "Delivered optimistic CRDT syncing with less than 120ms perceived latency for 20 concurrent editors.",
      "Introduced guided onboarding flows that boosted activation by 18% within the first month.",
      "Implemented audit-ready activity logs and role-based permissions for enterprise rollout.",
    ],
    image: "/images/projects/sirius-collab.png",
    links: {
      live: "https://sirius.yunsu.dev",
      github: "https://github.com/yunsux/sirius-suite",
    },
  },
  {
    title: "Atlas Pricing Engine",
    description:
      "Dynamic pricing intelligence tool generating SKU recommendations backed by market signals and inventory health.",
    year: "2022",
    tech: ["Next.js", "GraphQL", "Apollo", "Tailwind", "D3.js"],
    role: "Senior Front-end Engineer",
    highlights: [
      "Crafted modular chart primitives powering cross-team experimentation without rework.",
      "Migrated marketing site + app shell to Next.js App Router to unify content authoring and product surfaces.",
      "Led accessibility push hitting WCAG AA compliance across all revenue-critical flows.",
    ],
    image: "/images/projects/atlas-pricing.png",
    links: {
      live: "https://atlas.yunsu.dev",
      github: "https://github.com/yunsux/atlas-pricing",
    },
  },
];
