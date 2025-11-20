export type ExperienceEntry = {
  company: string;
  role: string;
  start: string; // YYYY-MM
  end: string;
  summary: string;
  achievements: string[];
};

export const experienceTimeline: ExperienceEntry[] = [
  {
    company: "Flux Product Studio",
    role: "Senior Front-end Engineer",
    start: "2023-04",
    end: "Present",
    summary:
      "Leading the Growth squad in evolving our design system and building motion-rich funnels across web + native.",
    achievements: [
      "Launched a Next.js App Router migration that reduced TTFB by 28% and cut bundle size 18%.",
      "Introduced a shared motion library aligning marketing + product systems, improving brand consistency.",
      "Mentored 4 engineers on accessibility + performance budgets, adding CI checks for Lighthouse KPIs.",
    ],
  },
  {
    company: "Northwind SaaS Platform",
    role: "Staff UI Engineer",
    start: "2020-02",
    end: "2023-03",
    summary:
      "Partnered with product + research to ship enterprise workflows spanning dashboards, automation, and billing surfaces.",
    achievements: [
      "Bootstrapped a token-driven component library adopted by six teams inside one quarter.",
      "Set up real user monitoring dashboards with UX SLOs, catching regressions before they shipped.",
      "Piloted cross-platform accessibility reviews that drove 40% fewer support tickets for screen reader users.",
    ],
  },
  {
    company: "Acme Commerce",
    role: "Senior Product Engineer",
    start: "2017-01",
    end: "2019-12",
    summary:
      "Owned the customer checkout and subscription surfaces during a high-growth period, balancing conversion + maintainability.",
    achievements: [
      "Built a server-driven UI experiment framework that allowed marketing to iterate weekly without deploys.",
      "Optimized cart + checkout flows, netting a 9% uplift in conversion across mobile web.",
      "Co-led hiring and onboarding programs for the front-end practice, scaling the team from 4 to 12 engineers.",
    ],
  },
];
