"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "@/components/ui/external-link-icon";
import { useMediaQuery } from "@/lib/use-media-query";

const sectionMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
} satisfies Partial<HTMLMotionProps<"section">>;

const projects = [
  {
    title: "Design System Core",
    description:
      "Architected a headless component system with tokens, accessibility primitives, and automated visual regression coverage.",
    stack: ["Next.js", "Tailwind", "Storybook"],
    href: "#",
  },
  {
    title: "Realtime Collaboration Suite",
    description:
      "Led the front-end squad delivering multiplayer whiteboarding with CRDT-based syncing and optimistic UI.",
    stack: ["React", "Zustand", "Framer Motion"],
    href: "#",
  },
  {
    title: "Pricing Intelligence Platform",
    description:
      "Built dashboards that blend streaming analytics with advanced filtering, featuring sub-second interactions on large data sets.",
    stack: ["Next.js", "tRPC", "Tailwind"],
    href: "#",
  },
] as const;

export function ProjectsSection() {
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const isLgUp = useMediaQuery("(min-width: 1024px)");
  const revealDuration = isMdUp ? 0.55 : 0.38;

  // Breakpoints: single column on mobile, md introduces two-up layout, lg expands to three-card grid.
  return (
    <motion.section
      id="projects"
      className="mainComponentWrapper"
      {...sectionMotion}
      transition={{ duration: revealDuration, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle>Selected work</SectionTitle>
        <p className="max-w-xl text-base leading-relaxed text-neutral-500 md:text-lg md:leading-relaxed lg:text-xl dark:text-neutral-400">
          Close collaboration with product, design, and data teams to deliver
          measurable outcomes. Here are a few highlights from recent product
          cycles.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{
              duration: isMdUp ? 0.45 : 0.32,
              delay: index * (isLgUp ? 0.08 : 0.06),
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Card className="flex h-full flex-col gap-4 p-6">
              <div className="flex items-center gap-2">
                {project.stack.map((tech) => (
                  <Badge
                    key={tech}
                    className="bg-brand/10 text-brand-600 text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="space-y-2">
                <h3 className="text-h3">{project.title}</h3>
                <p className="text-base leading-relaxed text-neutral-500 md:text-lg lg:text-xl dark:text-neutral-400">
                  {project.description}
                </p>
              </div>
              <div className="mt-auto">
                <Link
                  href={project.href}
                  className="text-brand hover:text-brand/80 inline-flex items-center gap-2 text-sm font-semibold transition"
                >
                  View project
                  <ExternalLinkIcon className="size-4" />
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
