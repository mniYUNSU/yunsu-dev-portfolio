"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const sectionMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} satisfies Partial<HTMLMotionProps<"section">>;

const skillGroups = [
  {
    label: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
  },
  {
    label: "Tooling",
    skills: ["Vite", "Vitest", "Storybook", "Turborepo", "Playwright"],
  },
  {
    label: "Product Ops",
    skills: ["Design Systems", "a11y", "Performance Tuning", "Team Leadership"],
  },
] as const;

export function SkillsSection() {
  return (
    <motion.section
      id="skills"
      className="mainComponentWrapper"
      {...sectionMotion}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle>Toolkit</SectionTitle>
        <p className="text-muted max-w-xl">
          A blend of product intuition and technical foundations that lets me
          ship quickly while keeping quality high.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {skillGroups.map((group) => (
          <Card key={group.label} className="flex flex-col gap-4 p-6">
            <h3 className="text-small text-neutral-500">{group.label}</h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge
                  key={skill}
                  className="bg-brand/10 text-brand-600 px-3 py-1 text-xs font-semibold"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}
