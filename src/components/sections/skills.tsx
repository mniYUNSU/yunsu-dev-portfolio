"use client";

import { useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { skills, type SkillCategory, type SkillLevel } from "@/data/skills";
import { cn } from "@/lib/utils";
import { useLocale } from "@/context/locale-context";
import { sectionMotion } from "@/styles/animations";

const levelStyles: Record<
  SkillLevel,
  {
    label: string;
    dot: string;
  }
> = {
  advanced: { label: "Advanced", dot: "bg-brand" },
  intermediate: { label: "Intermediate", dot: "bg-brand/70" },
  beginner: { label: "Beginner", dot: "bg-border" },
};

export function SkillsSection() {
  const fallbackCategory = skills[0];
  const [activeCategory, setActiveCategory] = useState<SkillCategory["category"]>(
    fallbackCategory?.category ?? "Frontend",
  );
  const { translations } = useLocale();

  const activeSkills = useMemo(
    () => skills.find((group) => group.category === activeCategory) ?? fallbackCategory,
    [activeCategory, fallbackCategory],
  );

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
      return;
    }
    event.preventDefault();
    const lastIndex = skills.length - 1;
    let nextIndex = index;
    if (event.key === "ArrowRight") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    }
    setActiveCategory(skills[nextIndex].category);
  };

  // Breakpoints: category tabs stack on mobile, form pill group at md, and content grid breathes on lg.
  return (
    <motion.section
      id="skills"
      className="mx-auto w-full max-w-[1200px] space-y-10 px-4 py-16 sm:px-6 md:py-24"
      {...sectionMotion}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle>{translations.sections.skills.title}</SectionTitle>
        <SectionTitle>{translations.sections.skills.title}</SectionTitle>
        <p className="max-w-xl text-base leading-relaxed text-neutral-500 md:text-lg md:leading-relaxed dark:text-neutral-400">
          Product-minded engineer centered on UI/UX craft, motion & performance budgets, and developer experience for
          fast-moving teams.
        </p>
      </div>

      <Card className="flex flex-col gap-6 p-6 md:p-8">
        <div
          role="tablist"
          aria-label="Skill categories"
          className="flex flex-wrap gap-2"
        >
          {skills.map((group, index) => {
            const isActive = group.category === activeCategory;
            return (
              <button
                key={group.category}
                id={`skill-tab-${group.category}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`skill-panel-${group.category}`}
                className={cn(
                  "border-border/50 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "bg-brand/10 text-brand"
                    : "text-neutral-600 hover:text-brand dark:text-neutral-300",
                )}
                onClick={() => setActiveCategory(group.category)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                {group.category}
              </button>
            );
          })}
        </div>

        <div
          id={`skill-panel-${activeSkills?.category}`}
          role="tabpanel"
          aria-labelledby={`skill-tab-${activeSkills?.category}`}
          className="space-y-6"
        >
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {activeSkills?.category === "Frontend" &&
              "Motion-first React builds, resilient app router architectures, and accessible systems."}
            {activeSkills?.category === "Mobile" &&
              "Shipping SwiftUI and React Native surfaces that mirror the craft of the web experience."}
            {activeSkills?.category === "Backend" &&
              "Comfortable shaping DX-friendly APIs, typed RPC layers, and infra that keeps frontends fast."}
            {activeSkills?.category === "Tools" &&
              "Evangelizing design system governance, testing suites, and automations that keep teams humming."}
          </div>

          <div className="flex flex-wrap gap-3">
            {activeSkills?.items.map((skill) => {
              const level = skill.level ?? "intermediate";
              const levelMeta = levelStyles[level];
              return (
                <Badge
                  key={skill.name}
                  className="normal-case gap-2 rounded-2xl border-border/60 bg-surface/90 px-4 py-2 text-sm font-medium tracking-normal text-neutral-700 dark:text-neutral-100"
                >
                  <span className={`size-2 rounded-full ${levelMeta.dot}`} aria-hidden="true" />
                  <span>{skill.name}</span>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                    {levelMeta.label}
                  </span>
                </Badge>
              );
            })}
          </div>
        </div>
      </Card>
    </motion.section>
  );
}
