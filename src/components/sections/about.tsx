"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/context/locale-context";
import { useMediaQuery } from "@/lib/use-media-query";
import {
  aboutIntroVariants,
  aboutStaggerVariants,
  sectionMotion,
} from "@/styles/animations";

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
  { label: "Tailwind CSS", symbol: "~" },
  { label: "Framer Motion", symbol: "FM" },
] as const;

export function AboutSection() {
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const isLgUp = useMediaQuery("(min-width: 1024px)");
  const { translations } = useLocale();

  const introVariants = aboutIntroVariants(isMdUp);
  const staggerVariants = aboutStaggerVariants(isMdUp, isLgUp);

  // Breakpoints: mobile stays single column; md splits content/statistics; lg gives grid breathing room.
  return (
    <motion.section
      id="about"
      className="mainComponentWrapper grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-16"
      {...sectionMotion}
    >
      <div className="space-y-8">
        <motion.div variants={introVariants} className="space-y-6">
          <SectionTitle>{translations.sections.about.title}</SectionTitle>
          <p className="text-base leading-relaxed font-medium text-neutral-600 md:text-lg md:leading-relaxed lg:text-xl dark:text-neutral-300">
            I translate intent into interfaces—partnering with design, product,
            and engineering to launch experiences that feel cohesive and
            considered. Every build threads usability, motion systems, and
            performance budgets.
          </p>
          <p className="text-base leading-relaxed text-neutral-500 md:text-lg md:leading-relaxed lg:text-xl dark:text-neutral-400">
            My recent work spans design system governance, App Router rollouts,
            and coaching teams on accessible animation. I love simplifying
            complex product surfaces into journeys customers can trust.
          </p>
        </motion.div>

        <motion.dl
          variants={staggerVariants}
          custom={0}
          className="border-border/60 bg-surface/80 shadow-soft grid gap-6 rounded-2xl border p-6 backdrop-blur-sm sm:grid-cols-3"
          aria-label="Quick facts"
        >
          {facts.map((fact) => (
            <div key={fact.label} className="space-y-1.5">
              <dt className="text-small text-neutral-500 dark:text-neutral-400">
                {fact.label}
              </dt>
              <dd className="text-h3 text-foreground">{fact.value}</dd>
              <dd className="text-base leading-relaxed text-neutral-500 md:text-lg lg:text-xl dark:text-neutral-400">
                {fact.detail}
              </dd>
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
              className="border-border/60 bg-surface/80 focus-visible:ring-brand/60 focus-visible:ring-offset-background inline-flex min-w-[3rem] items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold text-neutral-600 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:text-neutral-200"
              tabIndex={0}
            >
              <span aria-hidden>{tech.symbol}</span>
              <span className="sr-only">{tech.label}</span>
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div variants={staggerVariants} custom={2} className="space-y-6">
        <Card className="flex flex-col gap-6 p-6 md:p-7">
          <div>
            <p className="text-small text-neutral-500 dark:text-neutral-300">
              Currently crafting
            </p>
            <p className="text-h3 text-foreground mt-2">
              Senior Front-end Engineer · Product Studio
            </p>
          </div>
          <ul className="space-y-3 text-base leading-relaxed text-neutral-500 md:text-lg lg:text-xl dark:text-neutral-300">
            <li>
              - Leading an App Router adoption program with shared motion
              primitives.
            </li>
            <li>
              - Scaling a token-driven design system consumed by 5+ product
              teams.
            </li>
            <li>
              - Mentoring engineers on inclusive animation and DX workflows.
            </li>
          </ul>
        </Card>
      </motion.div>
    </motion.section>
  );
}
