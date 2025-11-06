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
      className="mainComponentWrapper"
      {...sectionMotion}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle>Experience</SectionTitle>
        <p className="text-muted max-w-xl">
          Leadership across startups and growth-stage companies, mentoring teams
          while staying close to the craft.
        </p>
      </div>

      <div className="before:bg-border/40 relative space-y-6 before:absolute before:inset-y-0 before:left-4 before:w-px before:content-[''] md:before:left-1/2 md:before:-translate-x-1/2">
        {experience.map((job, index) => (
          <motion.div
            key={job.role}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={index % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%]"}
          >
            <Card className="relative flex flex-col gap-4 p-6">
              <span className="bg-brand absolute top-6 left-4 size-3 rounded-full shadow-[0_0_0_4px_rgba(59,130,246,0.25)] md:top-8 md:-left-[calc(0.5px+0.375rem)]" />
              <div className="ml-8 space-y-1 md:ml-10">
                <p className="text-small text-neutral-500">{job.period}</p>
                <h3 className="text-h3 text-foreground">{job.role}</h3>
                <p className="text-muted">{job.company}</p>
              </div>
              <ul className="text-muted ml-8 list-disc space-y-2 md:ml-10">
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
