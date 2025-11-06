"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";

const sectionMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} satisfies Partial<HTMLMotionProps<"section">>;

const experience = [
  {
    role: "Senior Front-end Engineer",
    company: "Product Studio",
    period: "2021 — Present",
    highlights: [
      "Shipping features to millions of users with double-digit engagement lifts.",
      "Driving the adoption of CI gates covering performance budgets and accessibility.",
      "Pairing closely with design to prototype motion and micro-interactions.",
    ],
  },
  {
    role: "Staff UI Engineer",
    company: "SaaS Platform",
    period: "2018 — 2021",
    highlights: [
      "Rebuilt the marketing site on Next.js, cutting TTFB by 40%.",
      "Introduced an internal component marketplace consumed by 6 product lines.",
      "Stood up observability dashboards for user flows to monitor UX quality.",
    ],
  },
] as const;

export function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="container space-y-10 py-24"
      {...sectionMotion}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle>Experience</SectionTitle>
        <p className="max-w-xl text-sm text-foreground/70">
          Leadership across startups and growth-stage companies, mentoring teams
          while staying close to the craft.
        </p>
      </div>

      <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-4 before:w-px before:bg-border/40 before:content-[''] md:before:left-1/2 md:before:-translate-x-1/2">
        {experience.map((job, index) => (
          <motion.div
            key={job.role}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={index % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%]"}
          >
            <Card className="relative flex flex-col gap-4 border-border/50 bg-background/70 p-6">
              <span className="absolute left-4 top-6 size-3 rounded-full bg-primary shadow-[0_0_0_4px_rgba(125,211,252,0.2)] md:-left-[calc(0.5px+0.375rem)] md:top-8" />
              <div className="ml-8 space-y-1 md:ml-10">
                <p className="text-xs uppercase tracking-[0.3em] text-secondary-foreground/60">
                  {job.period}
                </p>
                <h3 className="text-lg font-semibold text-foreground">
                  {job.role}
                </h3>
                <p className="text-sm text-foreground/70">{job.company}</p>
              </div>
              <ul className="ml-8 list-disc space-y-2 text-sm text-foreground/80 md:ml-10">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
