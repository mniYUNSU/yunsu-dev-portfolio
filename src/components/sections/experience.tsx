"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { experienceTimeline } from "@/data/experience";

const sectionMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} satisfies Partial<HTMLMotionProps<"section">>;

const formatDate = (value: string) => {
  if (value.toLowerCase() === "present") {
    return "Present";
  }
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) {
    return value;
  }
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="mx-auto w-full max-w-[1200px] space-y-10 px-4 py-16 sm:px-6 md:py-24"
      {...sectionMotion}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle>Experience</SectionTitle>
        <p className="max-w-xl text-base leading-relaxed text-neutral-500 md:text-lg md:leading-relaxed dark:text-neutral-400">
          Leadership across startups and growth-stage teams—balancing product strategy, motion systems, and developer
          experience.
        </p>
      </div>

      <ol className="relative space-y-6 before:absolute before:inset-y-0 before:left-4 before:w-px before:bg-border/40 before:content-[''] md:space-y-10 md:before:left-1/2 md:before:-translate-x-1/2">
        {experienceTimeline.map((job, index) => {
          const period = `${formatDate(job.start)} — ${formatDate(job.end)}`;
          const isLeft = index % 2 === 0;
          return (
            <motion.li
              key={`${job.company}-${job.role}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={isLeft ? "md:pr-[55%]" : "md:pl-[55%]"}
            >
              <article>
                <Card className="relative flex flex-col gap-4 p-6">
                  <span className="bg-brand absolute top-6 left-4 size-3 rounded-full shadow-[0_0_0_4px_rgba(59,130,246,0.25)] md:top-8 md:-left-[calc(0.5px+0.375rem)]" />
                  <div className="ml-8 space-y-1 md:ml-10">
                    <p className="text-small text-neutral-500">{period}</p>
                    <h3 className="text-h3">{job.role}</h3>
                    <p className="text-base font-medium text-neutral-500 dark:text-neutral-300">{job.company}</p>
                    <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{job.summary}</p>
                  </div>
                  <ul className="ml-8 space-y-2 text-sm leading-relaxed text-neutral-600 marker:text-brand/70 md:ml-10 dark:text-neutral-300">
                    {job.achievements.map((achievement) => (
                      <li key={achievement} className="list-disc">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </Card>
              </article>
            </motion.li>
          );
        })}
      </ol>
    </motion.section>
  );
}
