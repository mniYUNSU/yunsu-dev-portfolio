export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type SkillCategory = {
  category: "Frontend" | "Mobile" | "Backend" | "Tools";
  items: {
    name: string;
    level?: SkillLevel;
  }[];
};

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", level: "advanced" },
      { name: "React", level: "advanced" },
      { name: "TypeScript", level: "advanced" },
      { name: "Tailwind CSS", level: "advanced" },
      { name: "Framer Motion", level: "advanced" },
      { name: "Radix UI", level: "intermediate" },
    ],
  },
  {
    category: "Mobile",
    items: [
      { name: "SwiftUI", level: "intermediate" },
      { name: "React Native", level: "intermediate" },
      { name: "Expo", level: "intermediate" },
      { name: "Motion Layout", level: "beginner" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: "intermediate" },
      { name: "tRPC", level: "intermediate" },
      { name: "GraphQL", level: "intermediate" },
      { name: "PostgreSQL", level: "intermediate" },
      { name: "Prisma", level: "intermediate" },
      { name: "Cloudflare Workers", level: "beginner" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Storybook", level: "advanced" },
      { name: "Turborepo", level: "advanced" },
      { name: "Playwright", level: "intermediate" },
      { name: "Vitest", level: "intermediate" },
      { name: "Figma", level: "advanced" },
      { name: "Linear", level: "advanced" },
    ],
  },
];
