"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";

const sectionMotion = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
} satisfies Partial<HTMLMotionProps<"section">>;

const introVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const staggerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.15 + index * 0.08 },
  }),
};

const facts = [
  {
    label: "Years of Experience",
    value: "8+",
    detail: "Product-led teams",
  },
  {
    label: "Focus Areas",
    value: "Design Systems & Motion",
    detail: "App Router, a11y, DX",
  },
  {
    label: "Location",
    value: "Seoul ↔ Remote",
    detail: "UTC+09",
  },
] as const;

const techStack = [
  { label: "React", symbol: "⚛︎" },
  { label: "Next.js", symbol: "NΞ" },
  { label: "TypeScript", symbol: "TS" },
  { label: "Swift", symbol: "" },
  { label: "Tailwind CSS", symbol: "〰" },
  { label: "Framer Motion", symbol: "FM" },
] as const;

export function AboutSection() {
  return (
    <motion.section
      id="about"
      className="container grid gap-12 py-20 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start md:py-28"
      {...sectionMotion}
    >
      <div className="space-y-8">
        <motion.div variants={introVariants} className="space-y-6">
          <SectionTitle>Building delightful experiences</SectionTitle>
          <p className="text-lead">
            I translate intent into interfaces—partnering with design, product, and
            engineering to launch experiences that feel cohesive and considered.
            Every build threads usability, motion systems, and performance budgets.
          </p>
          <p className="text-muted">
            My recent work spans design system governance, App Router rollouts, and
            coaching teams on accessible animation. I love simplifying complex
            product surfaces into journeys customers can trust.
          </p>
        </motion.div>

        <motion.dl
          variants={staggerVariants}
          custom={0}
          className="grid gap-4 rounded-2xl border border-border/60 bg-surface/80 p-6 shadow-soft backdrop-blur-sm sm:grid-cols-3"
          aria-label="Quick facts"
        >
          {facts.map((fact) => (
            <div key={fact.label} className="space-y-1.5">
              <dt className="text-small text-neutral-500 dark:text-neutral-400">
                {fact.label}
              </dt>
              <dd className="text-h3 text-foreground">
                {fact.value}
              </dd>
              <dd className="text-muted">{fact.detail}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          variants={staggerVariants}
          custom={1}
          className="flex flex-wrap items-center gap-3"
          aria-label="Preferred tech stack"
        >
          {techStack.map((tech) => (
            <span
              key={tech.label}
              role="img"
              aria-label={tech.label}
              title={tech.label}
              className="inline-flex min-w-[3rem] items-center justify-center rounded-xl border border-border/60 bg-surface/80 px-4 py-2 text-sm font-semibold text-neutral-600 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-neutral-200"
              tabIndex={0}
            >
              <span aria-hidden>{tech.symbol}</span>
              <span className="sr-only">{tech.label}</span>
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        variants={staggerVariants}
        custom={2}
        className="space-y-6"
      >
        <Card className="flex flex-col gap-6 p-6">
          <div>
            <p className="text-small text-neutral-500 dark:text-neutral-300">
              Currently crafting
            </p>
            <p className="mt-2 text-h3 text-foreground">
              Senior Front-end Engineer · Product Studio
            </p>
          </div>
          <ul className="space-y-3 text-muted">
            <li>- Leading an App Router adoption program with shared motion primitives.</li>
            <li>- Scaling a token-driven design system consumed by 5+ product teams.</li>
            <li>- Mentoring engineers on inclusive animation and DX workflows.</li>
          </ul>
        </Card>
      </motion.div>
    </motion.section>
  );
}
